import{o as r,c as d,a as t,t as s,g as T,F as f,h as C,b as y,e as k,r as m,d as x,w as N,v as V,i as g}from"./index-DW8qeetS.js";const P={class:"d-flex w-100 justify-content-between"},D={class:"mb-1"},I={class:"mb-1"},j={__name:"ProductList",props:["product"],emits:["order-products"],setup(n,{emit:p}){const e=p;return(i,o)=>(r(),d("a",{href:"#",class:"list-group-item list-group-item-action",onClick:o[0]||(o[0]=T(u=>e("order-products",n.product),["prevent"]))},[t("div",P,[t("h5",D,s(n.product.name),1),t("small",null,"$"+s(n.product.price),1)]),t("p",I,s(n.product.description),1)]))}},B=C('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>',10),L=[B],S={__name:"TempOrderList",props:["product"],emits:["count-total","delete-product","change-item-num"],setup(n,{emit:p}){const e=p;return(i,o)=>{var u,h;return r(),d(f,null,[t("td",null,[t("button",{type:"button",class:"btn btn-sm",onClick:o[0]||(o[0]=_=>e("delete-product",n.product))},"x")]),t("td",null,s((u=n.product)==null?void 0:u.name),1),t("td",null,[t("small",null,s((h=n.product)==null?void 0:h.description),1)]),t("td",null,[t("select",{class:"form-select",onChange:o[1]||(o[1]=_=>(e("count-total"),e("change-item-num",_,n.product)))},L,32)]),t("td",null,s(n.product.price),1),t("td",null,s(n.product.price*n.product.num),1)],64)}}},F={class:"card"},M={class:"card-body"},Q={class:"card-title"},q=t("h5",null,"訂單",-1),E={class:"table"},H=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"品項"),t("th",{scope:"col"},"數量"),t("th",{scope:"col"},"小計")])],-1),U={class:"text-end"},z={class:"text-end"},A={__name:"OrderCard",props:{outputOrder:{type:Object,required:!0,default:()=>({order:[],orderTotal:0,note:""})}},setup(n){return(p,e)=>{var i;return r(),d("div",F,[t("div",M,[t("div",Q,[q,t("table",E,[H,t("tbody",null,[(r(!0),d(f,null,y((i=n.outputOrder)==null?void 0:i.order,o=>(r(),d("tr",{key:o.id},[t("td",null,s(o.name),1),t("td",null,s(o.count),1),t("td",null,s(o.price*o.num),1)]))),128))])]),t("div",U,[k(" 備註: "),t("span",null,s(n.outputOrder.note),1)]),t("div",z,[t("h5",null,[k(" 總計: "),t("span",null,"$"+s(n.outputOrder.orderTotal),1)])])])])])}}},G={id:"root"},J={class:"container mt-5"},K={class:"row"},R={class:"col-md-4"},W={class:"col-md-8"},X={class:"table"},Y=t("thead",null,[t("tr",null,[t("th",{scope:"col",width:"50"},"操作"),t("th",{scope:"col"},"品項"),t("th",{scope:"col"},"描述"),t("th",{scope:"col",width:"90"},"數量"),t("th",{scope:"col"},"單價"),t("th",{scope:"col"},"小計")])],-1),Z={key:0,class:"alert alert-primary text-center",role:"alert"},tt={class:"text-end mb-3"},et={class:"text-end"},ot=t("hr",null,null,-1),nt={key:0,class:"row justify-content-center"},lt={class:"col-8"},rt={__name:"Homework_3",setup(n){const p=m([{id:1,name:"珍珠奶茶",description:"香濃奶茶搭配QQ珍珠",price:50},{id:2,name:"冬瓜檸檬",description:"清新冬瓜配上新鮮檸檬",price:45},{id:3,name:"翡翠檸檬",description:"綠茶與檸檬的完美結合",price:55},{id:4,name:"四季春茶",description:"香醇四季春茶，回甘無比",price:45},{id:5,name:"阿薩姆奶茶",description:"阿薩姆紅茶搭配香醇鮮奶",price:50},{id:6,name:"檸檬冰茶",description:"檸檬與冰茶的清新組合",price:45},{id:7,name:"芒果綠茶",description:"芒果與綠茶的獨特風味",price:55},{id:8,name:"抹茶拿鐵",description:"抹茶與鮮奶的絕配",price:60}]),e=m([]),i=m(0),o=m(""),u=m({}),h=c=>{e.value.filter(l=>l.id===c.id).length>0||(e.value.push(c),c.num=1,b())};function _(c,l){const v=e.value.findIndex($=>$.id===l.id);e.value[v].num=c.target.value,b()}function b(){i.value=e.value.reduce((c,l)=>c+l.price*l.num,0)}const w=c=>{const l=e.value.findIndex(v=>v.id===c.id);e.value.splice(l,1),b()},O=()=>{u.value.order=[...e.value],u.value.orderTotal=i.value,u.value.note=o.value,e.value=[],i.value=0,o.value=""};return(c,l)=>{var v,$;return r(),d("div",G,[t("div",J,[t("div",K,[t("div",R,[(r(!0),d(f,null,y(p.value,a=>(r(),d("div",{class:"list-group",key:a.id},[g(j,{product:a,onOrderProducts:h},null,8,["product"])]))),128))]),t("div",W,[t("table",X,[Y,t("tbody",null,[e.value.length?(r(!0),d(f,{key:0},y(e.value,a=>(r(),d("tr",{key:a.id},[g(S,{product:a,onChangeItemNum:_,onDeleteProduct:w,onCountTotal:b},null,8,["product"])]))),128)):x("",!0)])]),e.value.length?x("",!0):(r(),d("div",Z,"請選擇商品")),t("div",tt,[t("h5",null,[k(" 總計: "),t("span",null,"$"+s(i.value),1)])]),N(t("textarea",{class:"form-control mb-3",rows:"3",placeholder:"備註","onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a)},null,512),[[V,o.value]]),t("div",et,[t("button",{class:"btn btn-primary",onClick:l[1]||(l[1]=a=>O())},"送出")])])]),ot,($=(v=u.value)==null?void 0:v.order)!=null&&$.length?(r(),d("div",nt,[t("div",lt,[g(A,{outputOrder:u.value},null,8,["outputOrder"])])])):x("",!0)])])}}};export{rt as default};
