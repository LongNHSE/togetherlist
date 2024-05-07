// // hooks/auth/useApiAuth.ts

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRefreshToken } from "./useRefreshToken";
// import { ApiAuth } from "@/lib/api";

// const useApiAuth = () => {
//   const { data: session } = useSession();
//   const refreshToken = useRefreshToken();

//   useEffect(() => {
//     const requestIntercept = ApiAuth.interceptors.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           config.headers[
//             "Authorization"
//           ] = `Bearer ${session?.tokens?.accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = ApiAuth.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           await refreshToken();
//           prevRequest.headers[
//             "Authorization"
//           ] = `Bearer ${session?.tokens.accessToken}`;
//           return ApiAuth(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       ApiAuth.interceptors.request.eject(requestIntercept);
//       ApiAuth.interceptors.response.eject(responseIntercept);
//     };
//   }, [session, refreshToken]);

//   return ApiAuth;
// };

// export default useApiAuth;
