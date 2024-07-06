import Image from "next/image";
import Header from "./components/header";
import HomePage from './homepage'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header></Header>
      <HomePage></HomePage>
    </main>
  );
}
