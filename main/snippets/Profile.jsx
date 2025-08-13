export const ProfileView = observer(({ authState }) => {
  const user = authState.user;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="Profile" />
    </div>
  );
});
