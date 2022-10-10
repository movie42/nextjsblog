---
categories:
  - Development
  - NextJS
date: "2022-10-10"
description: 설명을 적는 곳입니다
slug: make_nextjs_blog
tags:
  - nextjs
  - 초보
  - ssg
title: NextJS로 블로그 만들어보기
---

## NextJS는 라우팅을 어떻게 할까?

[Pages, NextJS Docs](https://nextjs.org/docs/basic-features/pages)를 보면 어떻게 페이지를 만드는지 나와있다. pages 폴더 안에 라우팅 할 이름으로 jsx 파일을 만들면 된다.(js, jsx, ts, tsx 다 된다.)
[다이나믹 라우트](https://nextjs.org/docs/routing/dynamic-routes)는 잘 이해가 되지 않지만 [예제](https://github.com/vercel/next.js/blob/canary/examples/dynamic-routing/pages/post/%5Bid%5D/%5Bcomment%5D.tsx)를 보고 따라서 만들었다.

폴더 안에 다이나믹 라우팅을 하려는 항목을 문자열로 넣고 그 안에 파일을 파일을 만든다. pages 폴더의 파일이나 폴더의 이름이 라우터의 이름이 되는 것이기 때문에 [id]는 :id에 해당한다. 폴더를 경로로 지정하고 싶다면 폴더 안에 이름이 index인 jsx 파일을 만들어주면 폴더 이름으로 된 경로가 생성된다.
