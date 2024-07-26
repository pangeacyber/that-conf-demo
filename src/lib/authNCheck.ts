import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PangeaConfig, AuthNService, PangeaErrors, AuthN } from "pangea-node-sdk";

const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN });
const authn = new AuthNService(process.env.PANGEA_TOKEN as string, config);

const getBearerToken = (req: NextApiRequest) => {
  const authorizationHeader =
  req.headers instanceof Headers
  ? req.headers.get("authorization")
  : req.headers?.authorization;
  
  const authorizationHeaderParts = authorizationHeader?.split(" ");
  
  const bearerToken =
  authorizationHeaderParts?.[0]?.toLowerCase() === "bearer" ? 
  authorizationHeaderParts?.[1] : "";
  
  return bearerToken;
};

const validateToken = async (token: string) => {
  const result = false;

  if (token) {
    // Check the token against the authn service
    try {
      const response = await authn.client.clientToken.check(token);
      const authStatus = response.status === "Success";
      return authStatus;
      
    } catch (error) {
      if (error instanceof PangeaErrors.APIError) {
        console.error("Something went wrong with your Pangea Configuration");
        console.error(error.toString());
      } else {
        console.error(
          "Error occured during token validation. Looks like environment variables haven't been set correctly, or the service token has expired",
          error
          );
        }
      }
    }
    return result;
};
  
// Fetch user Info
export const getUserId = async (req: NextApiRequest) => {
  const token = getBearerToken(req);
  const result = "";
  
  if (token) {
    // Check the token against the authn service
    try {
      const response = await authn.client.clientToken.check(token);
      const authStatus = response.status === "Success";
      
      const userId = authStatus ? response.result.id : ""
      
      return userId;
      
    } catch (error) {
      if (error instanceof PangeaErrors.APIError) {
        console.error("Something went wrong with your Pangea Configuration");
        console.error(error.toString());
      } else {
        console.error(
          "Error occured during token validation. Looks like environment variables haven't been set correctly, or the service token has expired",
          error
          );
        }
      }
  }
  return result;
}
    
export const withAPIAuthentication = (apiHandler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check the environment variables
    if (
      !process.env.PANGEA_DOMAIN || 
      !process.env.PANGEA_TOKEN
      ) {
        console.error(
          "Missing environment variables, please make sure you have PANGEA_DOMAIN and AUTHN_TOKEN set in your .env file"
          );
          return res.status(401).json("Unauthorized");
        }
        
    const isTokenValid = await validateToken(getBearerToken(req));
    
    // Authentication failed, return 401
    if (!isTokenValid) {
      return res.status(401).json("Unauthorized");
    }
        
    // We are good to continue
    return await apiHandler(req, res);
  };
};
    