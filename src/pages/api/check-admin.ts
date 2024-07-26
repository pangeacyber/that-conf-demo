import { getUserId, withAPIAuthentication } from '@/lib/authNCheck';
import type { NextApiRequest, NextApiResponse } from 'next'
import { PangeaConfig, AuthZService, PangeaErrors} from 'pangea-node-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const config = new PangeaConfig({ domain: process.env.PANGEA_DOMAIN });
    const authz = new AuthZService(process.env.PANGEA_TOKEN as string, config);

    if (req.body) {
        try {
            const userId = await getUserId(req);
            const authZCheckStatus = await authz.check({
                resource: {
                    type: req.body.resource_type
                },
                action: req.body.action,
                subject: {
                    type: 'user',
                    id: userId
                }
            }).catch
        } catch(error) {
            console.error(error);
            res.status(403).json({message: "Error while fetching logs. Please look at console logs for more details."})
        }
    } else {
        res.status(400).json({message: 'Bad request. Unable to post.'})
    }
}

export default withAPIAuthentication(handler);