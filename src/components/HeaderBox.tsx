import { getUser } from "@/lib/actions/user.actions";

const HeaderBox = async ({
  type = "title",
  title,
  subtext,
}: HeaderBoxProps) => {
  const user = await getUser();
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-primary">&nbsp;{user?.firstName}</span>
        )}
      </h1>      
      { subtext ??
        <h2>
          {subtext}
        </h2>}
    </div>
  );
};

export default HeaderBox;
