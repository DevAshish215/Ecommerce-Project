export default function removePassword(user) {
  const { password, ...rest } = user;
  return rest;
}
