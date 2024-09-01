const HeaderBox = async ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  const loggedIn = "Guest"; // await getLoggedInUser()
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-primary">&nbsp;{loggedIn}</span>
        )}
      </h1>
    </div>
  );
};

export default HeaderBox;
