import auditSearch, { UserLocationType } from '@/lib/auditSearch'
import getUserProfile from '@/lib/getUserProfile';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body) {
        try {
            const auditResp: UserLocationType = await auditSearch(req.body)
            const userEmailList = Object.keys(auditResp);
            const winner = userEmailList[Math.floor(Math.random()*userEmailList.length)]
            console.log(winner);
            const winnerProfile = await getUserProfile(winner);

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