export const twitchAuthUrl = (location: Location): string => {
  const redirectUrl = `${location.origin}/live/songlist/`;
  return `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.GATSBY_TWITCH_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=openid&claims={"id_token":{"preferred_username":null}}`;
};
