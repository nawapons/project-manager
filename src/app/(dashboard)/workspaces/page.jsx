import axios from "axios";
import { redirect } from "next/navigation";
import { getWorkspaces } from "../query";

export default async function Home() {
    const workspace = await getWorkspaces();
    if (workspace.data.count === 0) {
        redirect("/workspaces/create")
    } else {
        redirect(`/workspaces/${workspace.data[0].id}`)
    }
}
