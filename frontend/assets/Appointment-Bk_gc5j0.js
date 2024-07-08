import{m as _,r as l,U as m,t as v,j as e,L as j,d as k,c as N,_ as S}from"./index-BMh66HCr.js";import{c as C}from"./convertDate-DsGWlg30.js";import{c as g}from"./clsx-B-dksMZM.js";import{u as D}from"./useCloseOnOutsideClick-BstDWFtL.js";/**
 * @license lucide-react v0.395.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=_("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),z=()=>{const[r,x]=l.useState(null),[f,o]=l.useState(!1),[i,d]=l.useState(""),y=["pending","approved","rejected"],[a,h]=l.useState({status:"",_id:""}),{user:n}=m(),u=v({queryKey:["appointments"],queryFn:async()=>{const{data:s}=await N.get("/api/appointment");return s.appointments}});l.useEffect(()=>{x(u.data)},[u]);const b=async()=>{var s,c;try{o(!0),await N.put(`/api/appointment/${a._id}`,{status:a.status}),x(t=>t.map(p=>(p._id==a._id&&(p.status=a.status),p))),h({status:"",_id:""}),o(!1)}catch(t){S.error(((c=(s=t==null?void 0:t.response)==null?void 0:s.data)==null?void 0:c.message)||"There is an Error"),o(!1),console.error(t)}},w=D(()=>d(""));return e.jsx("div",{className:"pcontainer py-10 w-full overflow-x-auto",children:e.jsx("div",{className:"h-full",children:e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 ",children:[e.jsx("thead",{className:"text-xs text-gray-700 whitespace-nowrap uppercase bg-gray-100",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"user"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"date"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Time slot"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"noted"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"status"}),a._id&&e.jsx("th",{scope:"col",className:"px-6 py-3",children:"action"})]})}),e.jsx("tbody",{children:r==null?void 0:r.map(s=>{let c=(a==null?void 0:a._id)==(s==null?void 0:s._id)?a==null?void 0:a.status:s==null?void 0:s.status;return e.jsxs("tr",{className:"odd:bg-white even:bg-gray-50 ",children:[e.jsx("th",{scope:"row",className:"px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap ",children:s.patient.name?e.jsxs(j,{target:"_blank",to:`/profile/${s.patient._id}`,className:"flex gap-2 items-center",children:[e.jsx("img",{className:"w-10 h-10 border",src:s.patient.picture,alt:""}),e.jsxs("div",{children:[e.jsx("span",{className:"block",children:s.patient.name}),e.jsx("span",{className:"block",children:s.patient.role})]})]}):e.jsxs(j,{target:"_blank",to:`/profile/${s.doctor._id}`,className:"flex gap-2 items-center",children:[e.jsx("img",{className:"w-10 h-10 border",src:s.doctor.picture,alt:""}),e.jsxs("div",{children:[e.jsx("span",{className:"block",children:s.doctor.name}),e.jsx("span",{className:"block",children:s.doctor.role})]})]})}),e.jsx("td",{className:"px-6 py-4 text-xs whitespace-nowrap",children:C(s==null?void 0:s.date)}),e.jsx("td",{className:"px-6 py-4 text-xs whitespace-nowrap",children:s==null?void 0:s.timeSlot}),e.jsx("td",{className:"px-6 py-4 text-xs",children:e.jsx("div",{className:"max-w-44 min-w-28",children:s==null?void 0:s.noted})}),e.jsx("td",{className:"px-6 py-4 text-xs",children:e.jsxs("div",{className:"relative flex",children:[e.jsxs("button",{disabled:(n==null?void 0:n.role)!="doctor",onClick:()=>d((s==null?void 0:s._id)==i?"":s._id),className:"flex gap-2 items-center ",children:[e.jsx("div",{className:g("w-2 h-2 rounded-full",{"bg-yellow-500":c=="pending"},{"bg-green-500":c=="approved"},{"bg-red-500":c=="rejected"})}),e.jsxs("div",{className:"flex items-center gap-1",children:[c,(n==null?void 0:n.role)=="doctor"&&e.jsx(E,{size:15})]})]}),i==s._id&&e.jsx("div",{ref:w,className:"absolute top-5 w-28 bg-white-White border rounded-b-md z-50",children:y.map(t=>e.jsxs("button",{onClick:()=>{h({status:t,_id:s==null?void 0:s._id}),d("")},className:"w-full py-2 flex items-center gap-2 px-3",children:[e.jsx("div",{className:g("w-2 h-2 rounded-full",{"bg-yellow-500":t=="pending"},{"bg-green-500":t=="approved"},{"bg-red-500":t=="rejected"})}),t]},t))})]})}),(a==null?void 0:a._id)==(s==null?void 0:s._id)&&e.jsx("td",{className:"px-6 py-4 text-xs",children:e.jsx("button",{onClick:b,className:"text-blue-500 font-medium",children:f?e.jsx(k,{className:"animate-spin"}):"Save"})})]},s==null?void 0:s._id)})})]})})})};export{z as default};