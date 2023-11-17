import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";

async function RecipeList() {
  const session = await getServerSession(authOptions);

  return <div>RecipeList</div>;
}

export default RecipeList;
