import{r as S,u as w,c as N,_ as x,j as e,L as j,R as v,d as P}from"./index-BMh66HCr.js";import{u as E}from"./index.esm-ClWcd2Qo.js";import{B as M}from"./BackGroundImg-C1w7vS1l.js";import{E as n}from"./ErrorMsg-1cl8sRVV.js";const I="/assets/doctor-sign-in-BmXuUK5k.jpg",U=["Allergist/Immunologist","Anesthesiologist","Cardiologist","Colon and Rectal Surgeon","Critical Care Medicine Specialist","Dermatologist","Endocrinologist","Emergency Medicine Specialist","Family Medicine Physician","Gastroenterologist","Geriatric Medicine Specialist","Hematologist","Hospice and Palliative Medicine Specialist","Infectious Disease Specialist","Internist","Medical Geneticist","Nephrologist","Neurologist","Neurosurgeon","Obstetrician/Gynecologist (OB/GYN)","Oncologist","Ophthalmologist","Orthopedic Surgeon","Otolaryngologist (ENT)","Pathologist","Pediatrician","Physiatrist","Plastic Surgeon","Psychiatrist","Pulmonologist","Radiologist","Rheumatologist","Sleep Medicine Specialist","Sports Medicine Specialist","Surgeon","Thoracic Surgeon","Urologist","Vascular Surgeon"],q=["Bahrain","Cyprus","Egypt","Iran","Iraq","Israel","Jordan","Kuwait","Lebanon","Oman","Palestine","Qatar","Saudi Arabia","Syria","Turkey","United Arab Emirates (UAE)","Yemen"],A=()=>{var r,c,d,p,u,m;const{register:a,handleSubmit:y,formState:{errors:s}}=E(),[o,t]=S.useState(!1),b=w(),f=y(async i=>{var g,h;try{t(!0);const{data:l}=await N.post("/auth/doctor/sign-up",{name:i.name,email:i.email,password:i.password,country:i.country,phone:i.phone,specialization:i.specialization});x.success(l.message),b("/"),window.location.reload(),t(!1)}catch(l){x.error(((h=(g=l==null?void 0:l.response)==null?void 0:g.data)==null?void 0:h.message)||"There is an Error"),t(!1),console.error(l)}});return e.jsx(M,{bg:I,children:e.jsxs("div",{className:"w-full h-full flex justify-center items-center md:justify-between",children:[e.jsxs("div",{className:"hidden md:flex flex-col items-center justify-center gap-5",children:[e.jsx(j,{to:"/",children:e.jsx(v,{className:""})}),e.jsx("div",{children:e.jsx("span",{className:"text-white-White text-lg",children:"Sign Up"})})]}),e.jsx("div",{className:"",children:e.jsx("form",{onSubmit:f,children:e.jsxs("div",{className:"bg-white-White p-5 md:p-10 w-[350px] sm:w-[450px] md:w-[500px] space-y-5",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsx("h3",{className:"text-4xl font-bold",children:"Sign Up"}),e.jsxs("div",{children:["Already here? ",e.jsx(j,{className:"text-blue-500 underline",to:"/sign-in",children:"Sign in"})]})]}),e.jsxs("div",{className:"space-y-3 pb-5",children:[e.jsxs("div",{children:[e.jsx("input",{placeholder:"Full name",className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("name",{required:"Please enter name field"}),type:"name"}),e.jsx(n,{message:(r=s==null?void 0:s.name)==null?void 0:r.message})]}),e.jsxs("div",{children:[e.jsx("input",{placeholder:"Email",className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("email",{required:"Please enter Email field"}),type:"email"}),e.jsx(n,{message:(c=s==null?void 0:s.email)==null?void 0:c.message})]}),e.jsxs("div",{children:[e.jsx("input",{placeholder:"Phone",className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("phone",{required:"Please enter phone field"}),type:"phone"}),e.jsx(n,{message:(d=s==null?void 0:s.phone)==null?void 0:d.message})]}),e.jsxs("div",{children:[e.jsxs("select",{className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("country",{required:"Please enter country field"}),children:[e.jsx("option",{className:"",value:"",children:"Country"}),q.map(i=>e.jsx("option",{value:i,children:i},i))]}),e.jsx(n,{message:(p=s==null?void 0:s.country)==null?void 0:p.message})]}),e.jsxs("div",{children:[e.jsxs("select",{className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("specialization",{required:"Please enter specialization field"}),children:[e.jsx("option",{value:"",children:"Specialization"}),U.map(i=>e.jsx("option",{value:i,children:i},i))]}),e.jsx(n,{message:(u=s==null?void 0:s.specialization)==null?void 0:u.message})]}),e.jsxs("div",{children:[e.jsx("input",{placeholder:"Password",className:"border w-full py-3 px-2 outline-none focus:border-primary-blue",...a("password",{required:"Please enter Password field"}),type:"password"}),e.jsx(n,{message:(m=s==null?void 0:s.password)==null?void 0:m.message})]}),e.jsx("button",{disabled:o,className:"bg-primary-blue disabled:bg-black-black/30 w-full py-3 text-white-White font-semibold flex items-center justify-center",children:o?e.jsx(P,{className:"animate-spin"}):"Sign Up"})]})]})})})]})})};export{A as default};