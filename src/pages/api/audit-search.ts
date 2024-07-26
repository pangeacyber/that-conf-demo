import auditSearch from '@/lib/auditSearch'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body) {
        try {
            const auditResp = await auditSearch(req.body)
            res.status(200).json(auditResp)
        } catch(error) {
            console.error(error);
            res.status(403).json({message: "Error while fetching logs. Please look at console logs for more details."})
        }
    } else {
        res.status(400).json({message: 'Bad request. Unable to post.'})
    }
}