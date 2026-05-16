// import Service from "../utils/http";


// export const Submission = () => {
//     const[submission, setSubmission] = useState({})
//     const service=new Service();
//     const fetchSubmission = async() => {
//         try{
//             const res=await Service.get("submission");
//             setSubmission(res);

//         }
//         catch(error){
//             console.error("Error fetching submission:", error);
//         }
//     }
//     useEffect(()=> {
//         fetchSubmission();
//     },[]);

//   return (
//     <div>Submission</div>
//   )
// }
