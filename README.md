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
    "start": "cross-evn NODE_PATH=src react-scripts start",
    "build": "cross-evn NODE_PATH=src react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
}
```



