import auditSearch from '@/lib/auditSearch'
import getUserProfile from '@/lib/getUserProfile';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body) {
        try {
            const auditResp = await auditSearch(req.body)
            const userHashList = Object.keys(auditResp);
            const winner = userHashList[Math.floor(Math.random()*userHashList.length)]
            console.log(auditResp[winner]);
            const winnerProfile = await getUserProfile(auditResp[winner].username);

            res.status(200).json(winnerProfile);
        }
        catch (error) {
            console.error(error);
            res.status(403).json({message: "No PANGEA_TOKEN found on server."})
        }
    } else {
        res.status(401).json({message: 'Bad request. Unable to post.'})
    }
}