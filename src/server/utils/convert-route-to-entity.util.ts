const mapping: Record<string, string> = {
  academies: 'academy',
  coaches: 'coach',
  players: 'player',
  'player-profiles': 'player_profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
