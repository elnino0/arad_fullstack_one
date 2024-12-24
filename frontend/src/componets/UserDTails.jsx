
/**
 * Displays a user's details, with options to edit or delete the user.
 * @param {{ details: { username: string, email: string, roles: string[] }, OnDelete: function, OnEdit: function }} props
 * @returns {JSX.Element}
 */
const UserDetails = ({ details , OnDelete, OnEdit}) => {
  console.log("UserDetails", details);
  const { username, email, roles } = details;

  return (
    <div>
      <h1>User Details</h1>
      <p>
        Username: {username}
        <br />
        Email: {email}
        <br />
        Roles: {roles.join(", ")}
      </p>
      <button onClick={() => {OnEdit(details)}}>Edit</button>
      <button onClick={() => {OnDelete(details)}}>Delete</button>
    </div>
  );
};

export default UserDetails;