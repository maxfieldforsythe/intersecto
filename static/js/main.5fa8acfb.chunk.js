(this.webpackJsonpintersectrontend=this.webpackJsonpintersectrontend||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(3),i=n.n(a),o=(n(21),n(7)),l=(n(22),n(16)),r=n.n(l),h=n(4),d=(n(42),n(1));function u(){return Object(d.jsx)("div",{className:"layout-topbar",children:"INTERSECTO"})}var g=function(){var e=[],t=[],n=1,s=[],a=[],i="blue",l=function(e){return Object(h.b)(e)},g=function(e,t){var n=document.getElementById("canvas").getContext("2d");n.lineWidth=2,n.strokeStyle=i,n.beginPath(),n.moveTo(e,t),n.lineTo(e+1,t+1),n.stroke()},b=function(c,l,r,h){var d=document.getElementById("canvas").getContext("2d");d.lineWidth=3,d.strokeStyle=i,d.beginPath(),d.moveTo(c,r),d.lineTo(l,h),d.stroke(),n<2?(s=[].concat(Object(o.a)(s),[[[c,r,0],[l,h,0]]]),JSON.stringify(s[s.length-1][1])===JSON.stringify(s[0][0])&&(n++,e=[],t=[],i="red")):(a=[].concat(Object(o.a)(a),[[[c,r,0],[l,h,0]]]),JSON.stringify(a[a.length-1][1])===JSON.stringify(a[0][0])&&(n++,console.log(s),console.log(a)))},f=function(){var c=document.getElementById("canvas");c.getContext("2d");c.width=c.offsetWidth,c.height=c.offsetHeight,e=[],t=[],s=[],a=[],n=1,i="blue"};return Object(c.useEffect)((function(){f()})),Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(u,{}),Object(d.jsxs)("div",{className:"layout-sidebar",children:[Object(d.jsx)("div",{style:{marginTop:"20px",color:"#fff"},children:"Menu/Tutorial"}),Object(d.jsx)("div",{style:{height:"2px",width:"85%",background:"#fff"}}),Object(d.jsxs)("div",{className:"sidebar-subtext",children:["Welcome!",Object(d.jsx)("br",{}),"To begin placing shapes click on the canvas to the right. To close a shape click near the starting point. After the first shape is closed you can begin drawing the second one. Feel free to clear the canvas to restart. The calculate button will tell you if they are intersecting."]}),Object(d.jsx)("button",{className:"buttons",onClick:function(){var e={shape1:s,shape2:a};3==n?r.a.post("https://flask-container-service.82ruic243qqso.us-east-1.cs.amazonlightsail.com/intersects",e).then((function(e){"True"===e.data?l("These shapes intersect!"):l("These shapes do not intersect :'("),console.log("SUCCESS",e)})).catch((function(e){console.log(e)})):Object(h.b)("Please close all shapes before calculating!")},children:"Calculate"}),Object(d.jsx)(h.a,{theme:"dark"}),Object(d.jsx)("button",{className:"buttons",onClick:f,children:"Clear Canvas"})]}),Object(d.jsx)("div",{className:"graph-container",children:Object(d.jsx)("div",{className:"page",children:Object(d.jsx)("div",{className:"data-table",onClick:function(c){var i=c.pageY-c.target.offsetTop,o=c.pageX-c.target.offsetLeft;e=t,t=[o,i],n<2?s.length>0&&o<s[0][0][0]+20&&o>s[0][0][0]-20&&i<s[0][0][1]+20&&i>s[0][0][1]-20&&(t=[s[0][0][0],s[0][0][1]]):a.length>0&&o<a[0][0][0]+20&&o>a[0][0][0]-20&&i<a[0][0][1]+20&&i>a[0][0][1]-20&&(t=[a[0][0][0],a[0][0][1]]),n<3&&g(o,i),e.length>0&&n<3&&b(e[0],t[0],e[1],t[1])},children:Object(d.jsx)("canvas",{id:"canvas",style:{width:"100%",height:"100%"}})})})})]})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,45)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};i.a.render(Object(d.jsx)(s.a.StrictMode,{children:Object(d.jsx)(g,{})}),document.getElementById("root")),b()}},[[44,1,2]]]);
//# sourceMappingURL=main.5fa8acfb.chunk.js.map