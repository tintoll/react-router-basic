#  React Router Basic 

#### 필요 라이브러리 설치 

```
yarn add react-router-dom
yarn add cross-env --dev
```

react-router-dom : 브라우저에서 사용되는 리액트 라우터

cross-env : 프로젝트에서 NODE_PATH를 사용하여 절대경로로 파일을 불러오기 위하여 환경 변수를 설정할때 운영체제마다 방식이 다르므로 공통적인 방법으로 설정할 수 있게 해주는 라이브러리

#### NODE_ENV 설정 

package.json파일에 아래와 같이 수정해주면 src가 루트경로로 설정됩니다.

```Json
"scripts": {
    "start": "cross-env NODE_PATH=src react-scripts start",
    "build": "cross-env NODE_PATH=src react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

라우터를 정의하기 위해서 **BrowserRouter**를 최상단에 정의해야합니다. 

```javascript
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from 'shared/App';

const Root = () => {
  return (  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default Root;
```

라우트를 설정할때는 **Route** 컴포넌트를 사용하고, 경로는 `path` 속성으로 설정하고 `component`속성에 사용할 컴포넌트를 적용하여 줍니다.

**exact**라는 옵션은 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다는 의미입니다. 

이 옵션을 안주면 /about하면  home,about이 같이 보여지게 됩니다.

```javascript
import React, { Component } from 'react';
import { Home, About } from 'pages';
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default App;
```

위와 같이 설정하면 브라우저에 localhost:3000, localhost:3000/about를 호출하면 잘보여집니다. 현재는 개발서버쪽에서 `historyApiFallback` 설정을 통하여 어떤 요청으로 들어오던 현재의 index.html 을 보여주도록 설정하게 되어 있다고 한다. 

그런데 링크를 직접입력하면 서버라우트를 한번 타게 된다고 한다. 그래서 서버쪽에서 리액트앱으로 연결시켜줘야합니다.  안그러면 404 Not found페이지만 뜰것이다. 

## 라우트 파라미터 읽어오기

라우트의 경로에 특정값을 넣는 방법은 2가지가 있다. params를 사용하는 것과 query를 사용하는 것이다.

라우트로 설정된 컴포넌트는 3가지 props를 전달받게 된다.

- **history** : 이 객체를 통해 push, replace를 통해서 다른 경로로 이동하거나 앞 뒤 페이지로 전환할수 있다.
- **location** : 이 객체는 현재 경로에 대한 정보를 지니고 있는 URL쿼리(**/about?foo=bar**형식) 정보도 가지고 있다.
- **match** : 이 객체에는 어떤 라우트에 매칭되었는지에 대한 정보가 있고 params(**/about/:name**)정보를 가지고 있다.

URL쿼리의 경우엔 컴포넌트 내에서 동적으로 사용할수 있으나, **params의 경우엔 사용하기전에 꼭 라우트에서 지정을 해주어야합니다.**

```javascript
// App.js
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, About } from 'pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/about/:name" component={About}/>
            </div>
        );
    }
}
export default App;

// About.js
import React from 'react';
const About = ({match}) => {
    return (
        <div>
            <h2>About {match.params.name}</h2>
        </div>
    );
};
export default About;
```

URL의 params를 설정할때는 ***:name*** 형식으로 설정합니다. 이 값을 사용할때는 ***match.params.name***을 통하여 확인할수 있습니다.

위와 같이 하면 About컴포넌트가 중복되어 보입니다. 그러면 exact를 사용하면 해결됩니다. 하지만 **Switch**컴포넌트를 사용하는 방법도 있습니다. 라우트들을 이 컴포넌트에 감싸면 매칭되는 첫번째 라우트만 보여주고 나머지는 보여주지 않습니다. 그래서 /about/:name을 위에 넣어주어야 합니다.

```javascript
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from 'pages';
class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </div>
        );
    }
}
export default App;
```







