import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { playerValidationSchema } from 'validationSchema/players';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPlayers();
    case 'POST':
      return createPlayer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayers() {
    const data = await prisma.player
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'player'));
    return res.status(200).json(data);
  }

  async function createPlayer() {
    await playerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.player_profile?.length > 0) {
      const create_player_profile = body.player_profile;
      body.player_profile = {
        create: create_player_profile,
      };
    } else {
      delete body.player_profile;
    }
    const data = await prisma.player.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
