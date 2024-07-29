export default async function (accessToken, refreshToken, profile, cb) {
  const { id: providerId, displayName, emails, photos, provider } = profile;

  this.logger.verbose(JSON.stringify({ ...profile }));
  const user = await this.usersService.findUserByProvider(providerId);
  if (user) return cb(null, user);

  let userData;
  const photo = photos[0]?.value;
  const isEmailVerified = emails[0]?.verified;
  userData = {
    provider,
    providerId,
    username: displayName,
    nickname: undefined,
    avatar: photo,
    accessToken,
    refreshToken,
    ...(isEmailVerified ? { email: emails[0].value } : {}),
  };
  return cb(null, userData);
}
