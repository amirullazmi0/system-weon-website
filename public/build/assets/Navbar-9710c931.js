import{j as e,F as i,r as n,a as s,c as a}from"./app-3fd6ad04.js";const v=()=>e(i,{children:e("div",{className:"tron"})}),p=v,g=({auth:o,active:c})=>{const[t,f]=n.useState(c),[d,l]=n.useState(!1),r=n.useRef(null);n.useEffect(()=>{function b(u){r.current&&!r.current.contains(u.target)&&(r.current.classList.remove("show"),l(!1))}document.addEventListener("mousedown",b)},[r]);const h=()=>{l(!1)},m=()=>{l(!0)};return s(i,{children:[e("div",{id:d?"sidebar-on":"sidebar-off",ref:r,children:(()=>e(i,{children:s("div",{className:"",children:[e("div",{className:"sidebar-brand mb-2",children:s("div",{className:"flex items-center",children:[e("img",{className:"h-16",src:"/img/loggo.png",alt:""}),e("button",{className:"btn btn-ghost btn-circle hover:bg-transparent sidebar-button ml-auto",onClick:()=>h(),children:e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})}),e("hr",{}),e("div",{className:"grid mt-3",children:s("ul",{className:"",children:[e("li",{className:"sidebar-list",children:s(a,{className:t==="dashboard"?"flex sidebar-item active":"flex sidebar-item",method:"get",href:route("home"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-7 h-7",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"})}),e("div",{className:"ml-3",children:"Dashboard"})]})}),e("li",{className:"sidebar-list",children:s(a,{className:t==="allTable"?"flex sidebar-item active":"flex sidebar-item",method:"get",href:route("allTable"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-7 h-7",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"})}),e("div",{className:"ml-3",children:"Data Tabel"})]})}),e("hr",{className:"mb-3"}),o.level==1?e("li",{className:"sidebar-list ",children:s(a,{className:t==="calibrate"?"flex sidebar-item active":"flex sidebar-item",method:"get",href:route("calibrate"),children:[e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"})}),e("div",{className:"ml-3",children:"Kalibrasi"})]})}):null]})})]})}))()}),s("div",{className:"navbar bg-ku lg:pr-6 lg:pl-6",children:[s("div",{className:"flex-1 nav-header",children:[e("div",{className:"flex mr-2 items-center",children:e("button",{className:"btn btn-ghost hover:bg-transparent",onClick:()=>m(),children:e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.5,stroke:"currentColor",className:"w-6 h-6 nav-side-icon",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"})})})}),e("img",{className:"h-12 nav-img",src:"/img/loggo.png",alt:""})]}),e("div",{className:"flex-none",children:s("div",{className:"dropdown dropdown-end",children:[e("label",{tabIndex:0,className:"btn btn-ghost btn-circle avatar",children:e("div",{className:"rounded-full",children:e("img",{className:"img-profile",src:"/img/profil.png"})})}),s("ul",{tabIndex:0,className:"menu menu-compact dropdown-content mt-7 gap-2 p-2 shadow-sm shadow-gray-500 bg-slate-50 rounded-box w-52 ",children:[e("li",{children:e(a,{className:t=="profil"?"btn btn-ghost btn-blue":"btn btn-ghost",method:"get",href:route("profil"),as:"button",children:"Profil"})}),e("li",{children:e(a,{className:"btn btn-ghost",method:"post",href:route("logout"),as:"button",children:"Logout"})})]})]})})]})]})},x=g;export{p as J,x as N};
