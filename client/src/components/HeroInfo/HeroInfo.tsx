import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteHeroById, getHeroById, updateHeroById } from "../../api/api";
import { Superhero } from "../../types/superhero";
import { Header } from "../Header/Header";
import { Input } from "../Input/Input";

export const HeroInfo = () => {
  const [superhero, setSuperhero] = useState<Superhero>();
  const { id } = useParams<{ id: string }>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>("");
  const [realName, setRealName] = useState<string>("");
  const [originDescription, setOriginDescription] = useState<string>("");
  const [superpowers, setSuperpowers] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const imageUrls: string[] = [];
  superhero?.images.forEach((image) => {
    const imageName = image.split("\\").pop();

    if (imageName) {
      const newUrl = `http://localhost:5000/uploads/${imageName}`;
      imageUrls.push(newUrl);
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  const onUpdateClick = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("real_name", realName);
    formData.append("origin_description", originDescription);
    formData.append("superpowers", superpowers);
    formData.append("catch_phrase", catchPhrase);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await updateHeroById(id as string, formData);
      setIsEdit(false);
      setUpdated((prev) => !prev);
    } catch (error: any) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  useEffect(() => {
    if (id) {
      getHeroById(id)
        .then((res) => {
          setSuperhero(res);
          setNickname(res.nickname);
          setRealName(res.real_name);
          setOriginDescription(res.origin_description);
          setSuperpowers(res.superpowers);
          setCatchPhrase(res.catch_phrase);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, updated]);

  const onDelete = async (id: string): Promise<void> => {
    try {
      await deleteHeroById(id);
      setIsDeleted(true);
    } catch (error: any) {
      console.error((error as Error).message);
      alert((error as Error).message);
    }
  };

  return (
    <>
      <Header />
      {isDeleted ? (
        <div className="flex flex-col  justify-center items-center h-full">
          <h1 className="text-3xl text-green-800 text-center">
            Superhero deleted successfully
          </h1>
          <Link
            to="/"
            className="p-2 bg-green-800 rounded-md text-white mt-4 ml-4"
          >
            Go to home page
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-x-4 pl-4 py-4  bg-amber-900">
          <button
            name="Delete Superhero"
            onClick={() => id && onDelete(id)}
            type="button"
            className="rounded-md bg-red-800 px-2.5 py-1.5 text-white shadow-sm hover:bg-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete Superhero
          </button>
          <button
            name={isEdit ? "Cancel" : "Edit Superhero"}
            onClick={() => setIsEdit(!isEdit)}
            type="button"
            className="rounded-md bg-yellow-600 px-2.5 py-1.5 text-white shadow-sm hover:bg-yellow-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isEdit ? "Cancel" : "Edit Superhero"}
          </button>
          {isEdit && (
            <button
              name="Update"
              onClick={onUpdateClick}
              type="button"
              className="rounded-md bg-green-800 px-2.5 py-1.5 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          )}
        </div>
      )}
      <div className="bg-blue-950 h-screen">
        <div className="flex flex-col gap-y-5 pl-8 pt-5 w-full">
          {isEdit ? (
            <Input
              name="nickname"
              label="Nickname"
              placeholder="Enter a nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          ) : (
            <h2 className="text-5xl font-semibold text-yellow-400">
              {superhero?.nickname}
            </h2>
          )}
          {isEdit ? (
            <Input
              name="real name"
              label="Real name"
              placeholder="Enter a real Name"
              type="text"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
            />
          ) : (
            <h3 className="text-xl text-yellow-500 font-semibold">
              {superhero?.real_name}
            </h3>
          )}

          {isEdit ? (
            <Input
              name="catch phrase"
              label="Catch phrase"
              placeholder="Enter a catch phrase"
              type="text"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
            />
          ) : (
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-yellow-600 sm:text-5xl">
              Phrase: {superhero?.catch_phrase}
            </p>
          )}
          {isEdit ? (
            <Input
              name="origin description"
              label="Origin description"
              placeholder="Enter an origin"
              type="text"
              value={originDescription}
              onChange={(e) => setOriginDescription(e.target.value)}
            />
          ) : (
            <p className="mt-5 text-xl text-yellow-700">
              Origin: {superhero?.origin_description}
            </p>
          )}
          {isEdit ? (
            <Input
              name="superpowers"
              label="Superpowers"
              placeholder="Enter superpowers"
              type="text"
              value={superpowers}
              onChange={(e) => setSuperpowers(e.target.value)}
            />
          ) : (
            <div className="div">
              <h4 className="text-red-600 text-3xl">Superpower</h4>
              <div className="text-lg text-red-500">
                {superhero?.superpowers}
              </div>
            </div>
          )}
          {isEdit && (
            <Input
              name="images"
              label="Upload Images"
              placeholder="Upload your photo"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pl-6 mt-5 bg-blue-950">
          {imageUrls.map((image) => (
            <div className="flex justify-center items-center h-80" key={image}>
              <img
                src={image}
                alt={image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
