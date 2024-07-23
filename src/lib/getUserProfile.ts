import { PangeaConfig, AuthNService } from "pangea-node-sdk";

const token = process.env.PANGEA_TOKEN;
const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN });


export default async function getUserProfile(email: string) {
    const authn = new AuthNService(token as string, config);
    const response = await authn.user.profile.getProfile(
        {
          email: "joe.user@email.com",
        }
    );

    let userProfile = {
        "email": email,
        "name": "",
        "image_url": ""
    }

    if(response.success && response.result && response.result.profile) {
        userProfile["name"] = (response.result.profile.first_name ? response.result.profile?.first_name : "") + " " + (response.result.profile.last_name ? response.result.profile?.last_name : "");
        userProfile["image_url"] = response.result.profile.image_url ? response.result.profile.image_url : "";
    }

    return userProfile;
}
