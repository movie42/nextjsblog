---
categories:
  - Development
  - NextJS
date: "2022-10-10"
description: 설명을 적는 곳입니다
slug: make_nextjs_blog
tags:
  - nextjs
  - ssg
title: NextJS로 블로그 만들어보기
---

## NextJS는 라우팅을 어떻게 할까?

[Pages, NextJS Docs](https://nextjs.org/docs/basic-features/pages)를 보면 어떻게 페이지를 만드는지 나와있다. pages 폴더 안에 라우팅 할 이름으로 jsx 파일을 만들면 된다.(js, jsx, ts, tsx 다 된다.)
[다이나믹 라우트](https://nextjs.org/docs/routing/dynamic-routes)는 잘 이해가 되지 않지만 [예제](https://github.com/vercel/next.js/blob/canary/examples/dynamic-routing/pages/post/%5Bid%5D/%5Bcomment%5D.tsx)를 보고 따라서 만들었다.

폴더 안에 다이나믹 라우팅을 하려는 항목을 문자열로 넣고 그 안에 파일을 파일을 만든다. pages 폴더의 파일이나 폴더의 이름이 라우터의 이름이 되는 것이기 때문에 [id]는 :id에 해당한다. 폴더를 경로로 지정하고 싶다면 폴더 안에 이름이 index인 jsx 파일을 만들어주면 폴더 이름으로 된 경로가 생성된다.

> Q. NextJS는 왜 폴더로 라우팅을 하는걸까?

## SSG로 페이지 만들기

### getStaticProps

Docs Data Fetching에서 SSG를 클릭하면 getStaticProps로 바로 연결된다. 이름만 읽어보면 고정 된(정적인) Props를 얻는 함수같다. 아마도 미리 정해진 프로퍼티들을 가져오는 역할을 하는 함수로 보인다.

```ts
import React from "react";
import { useRouter } from "next/router";

interface IpostProps {}

const PostPages = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return <div>Post : {id}</div>;
};

export default PostPages;

export const getStaticProps = async () => {
  // const response = await fetch();
};
```

갯츠비에서 데이터를 가져올 때와 비슷한 형태를 가진다. getStaticProps에서 \_\_posts 파일을 가져오면 되는 것 같다. getStaticProps는

### \_\_posts에서 markdown 파일 파싱하기

폴더 안에 markdown을 페이지로 만들기 위한 과정을 추론해보았다.

1. 폴더에서 markdown파일을 가져와서 차례대로 읽는다.
2. markdown을 파싱해서 객체로 만든다.
3. 객체는 array로 저장한다.
4. 저장한 array를 getStaticProps에 보내서 json파일로 만든다.
5. nextJS에서 props를 읽어서 형태에 맞게 UI를 출력한다.

먼저 폴더를 읽어야한다. 파일을 어떻게 읽을 수 있을까? [이가은 님의 블로그](https://tistory.rooteun.com/98)를 참조했을 때 fs 모듈을 사용해야한다는 사실을 알게되었다.

### fs 모듈을 사용하려고 할 때 겪은 첫번째 에러

- Module not found:에러
  웹팩 설정을 다시 하면 된다.

```zsh
index.js?46cb:594 Uncaught Error: getStaticPaths is required for dynamic SSG pages and is missing for '/post/[id]'.
```

- **Unhandled Runtime Error TypeError: fs vue\_\_WEBPACK_IMPORTED_MODULE_0\_\_.readdirSync is not a function**
  에러

http://www.matthiassommer.it/software-architecture/webpack-node-modules/

fs를 클라이언트에서 실행시키려고 해서 생기는 오류다. getStaticPaths로 위치를 옮기면 오류가 사라진다.

```shell
wait  - compiling...
event - compiled client and server successfully in 56 ms (174 modules)
make_nextjs_blog.md
```

에러들을 따라가다보면 SSG를 하기 위해서 [getStaticPath와 getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)를 함께 사용해야한다.
