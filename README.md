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



### URL 쿼리

리액트 라우터 v3에는 URL쿼리를 해석해서 객체로 만들어주는 기능이 자체적으로 있었는데 v4에서는 더이상 내장하지 않습니다. 그래서 쿼리해석하는 라이브러리를 사용하는게 좋다.

```shell
yarn add query-string
```

사용방법

```javascript
import React from 'react';
import queryString from 'query-string';

const About = ({location, match}) => {
    const query = queryString.parse(location.search);
    const detail = query.detail === 'true';
    return (
        <div>
            <h2>About {match.params.name}</h2>
            {detail && 'detail: blahblah'}
        </div>
    );
};

export default About;
```

주의할점은 받아오는 값은 모두 문자열이라는 것입니다. 

### Link 컴포넌트

앱내에서 다른 라우트로 이동할때는 일반 <a>태그 형식으로 하면 안된다. 왜냐하면, 새로고침을 해버리기 때문이다.

새로고침하지 않기 위해선, 리액트 라우터에 있는 Link컴포넌트를 사용하면된다. 이 컴포넌트는 페이지를 새로 불러오는걸 막고, 원하는 라우트로 화면 전환해줍니다.

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about/foo">About Foo</Link></li>
            </ul>
            <hr/>
        </div>
    );
};
export default Menu;
```

이 컴포넌트에 전달되는 props들은 컴포넌트 내부의 DOM에도 전달되므로, 일반 DOM엘리먼트에 설정하는 것처럼 className, style 혹은 onClick등의 이벤트를 전달해 줄수 있다.

### NavLink컴포넌트

NavLink컴포넌트는 Link랑 비슷한데, 설정한 URL이 활성화가 되면, 특정 스타일 혹은 클래스를 지정할 수 있게 해준다는게 틀리다.

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;
```

Route를 지정할때처럼 중첩될수 있는 라우트들은 exact해주면 되고 특정클래스를 설정하고 싶다면 activeClassName으로 설정하면 된다.

### 라우트 속의 라우트

라우터 v4로 업데이트 되면서 달라진 점 중 하나는 Route 내부에 Route를 설정하는 방식이 달라진것이다.

v3에서는 아래와 같이

```javascript
<Route path="foo" component={Foo}>
    <Route path=":id" component={Bar}/>
</Route>
```

Foo컴포넌트에서 props.children의 자리에 Bar컴포넌트가 들어가는 형식이여서 모든 라우트는 최상위에 정해 주어야 했다. 

하지만 v4에서는 props.children을 사용하지 않고 라우트에서 보여주는 컴포넌트 내부에 또 Route를 사용할수 있게 됐습니다.

```javascript
// Post.js
import React from 'react';
const Post = ({match}) => {
    return (
        <div>
            포스트 {match.params.id}
        </div>
    );
};
export default Post;

// Posts.js
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Post } from 'pages'; 
const Posts = ({match}) => {
    return (
        <div>
           <h2>Post List</h2> 
           <ul>
                <li><Link to={`${match.url}/1`}>Post #1</Link></li>
                <li><Link to={`${match.url}/2`}>Post #2</Link></li>
                <li><Link to={`${match.url}/3`}>Post #3</Link></li>
                <li><Link to={`${match.url}/4`}>Post #4</Link></li>
           </ul>
           <Route exact path={match.url} render={()=>(<h3>Please select any post</h3>)}/>
           <Route path={`${match.url}/:id`} component={Post}/>
        </div>
    );
};
export default Posts;
```

라우트가 받는 props중 헷갈리는 부분이 있습니다. 

- location.pathname
- match.path 
- match.url

**location.pathname**는 현재 브라우저상의 위치를 알려줍니다. 이 값은 어떤 라우트에서 렌더링하던 동일합니다.

**match** 는 설정한 Route와 직접적으로 관계된 값만 보여줍니다.

- Posts를 보여주는 라우트에선 :id값을 설정하지 않았으니 path와 url이 둘다 /posts입니다.
- Post를 보여주는 라우트에선 path의 경우엔 라우트에서 설정한 path값이 그대로 나타납니다. url의 경우엔 :id부분에 값이 들어간 상태로 나타납니다.





