import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function Admin() {
  const navigate = useNavigate();
  return (
    <main>
      <Navbar />

      <a href="/admin/problems"> Handle problems</a>
    </main>
  );
}
