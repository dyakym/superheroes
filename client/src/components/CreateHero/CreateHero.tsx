import { useState } from "react";
import { createHero } from "../../api/api";
import { Header } from "../Header/Header";
import { Input } from "../Input/Input";

export const CreateHero = () => {
  const [nickname, setNickName] = useState<string>("");
  const [realName, setRealName] = useState<string>("");
  const [originDescription, setOriginDescription] = useState<string>("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isCreated, setIsCreated] = useState<boolean>(false);

  const clerInputs = () => {
    setNickName("");
    setRealName("");
    setOriginDescription("");
    setSuperpowers("");
    setCatchPhrase("");
    setFiles(null);
  };

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (files) {
      if (files.length > 4) {
        alert("You can only upload 4 images");
        return;
      }
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    formData.append("nickname", nickname);
    formData.append("real_name", realName);
    formData.append("origin_description", originDescription);
    formData.append("superpowers", superpowers);
    formData.append("catch_phrase", catchPhrase);

    try {
      const result = await createHero(formData);
      setIsCreated(true);
      clerInputs();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div
        style={{
          backgroundImage: "url(/superhero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        className="flex flex-row gap-y-4 h-full justify-center"
      >
        <form
          className="flex flex-row w-full md:w-[70%] lg:w-[70%] self-center gap-y-4   bg-blue-950 rounded-xl group"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col w-full gap-y-4 p-5 md:w-[50%]">
            <h1 className="text-3xl font-bold text-gray-300">
              Create a new hero
            </h1>
            <Input
              name="nickname"
              label="Nickname"
              placeholder="Enter a nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
            <Input
              name="real_name"
              label="Real name"
              placeholder="Enter a real name"
              type="text"
              value={realName}
              onChange={(e) => {
                setRealName(e.target.value);
              }}
            />
            <Input
              name="origin_description"
              label="Origin description"
              placeholder="Enter an origin description"
              type="text"
              value={originDescription}
              onChange={(e) => {
                setOriginDescription(e.target.value);
              }}
            />
            <Input
              name="superpowers"
              label="Superpowers"
              placeholder="Enter superpowers"
              type="text"
              value={superpowers}
              onChange={(e) => {
                setSuperpowers(e.target.value);
              }}
            />
            <Input
              name="catch_phrase"
              label="Catch phrase"
              placeholder="Enter a catch phrase"
              type="text"
              value={catchPhrase}
              onChange={(e) => {
                setCatchPhrase(e.target.value);
              }}
            />
            <Input
              name="images"
              label="Select Hero Image"
              placeholder="Select Hero Image"
              multiple
              type="file"
              onChange={onChangeFiles}
            />
            <button
              type="submit"
              className="rounded-md bg-green-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
          <div className="flex p-5 bg-cover bg-center rounded-tr-xl rounded-br-xl md:w-[50%] lg:w-[70%]">
            {isCreated ? (
              <p className="text-3xl font-bold text-gray-300">
                Superhero is created
              </p>
            ) : (
              <p className="text-3xl font-bold text-gray-300">
                Create your superhero
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
