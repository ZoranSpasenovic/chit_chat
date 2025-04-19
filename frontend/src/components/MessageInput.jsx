import { Image, Send, X, Smile } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useChatStore from "../store/useChatStore";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { sendMessage } = useChatStore();

  const imageInputRef = useRef();
  const showPickerRef = useRef();
  const emojiRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      setTimeout(() => {
        if (
          showPickerRef.current &&
          emojiRef.current &&
          !showPickerRef.current.contains(e.target) &&
          !emojiRef.current.contains(e.target)
        ) {
          setShowPicker(false);
        }
      }, 0);
    };

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
    };
  }, [showPicker]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = async () => {
        const img = reader.result;
        setImage(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) return;
    const newMessage = {
      text: text.trim(),
      image,
    };

    try {
      await sendMessage(newMessage);
      imageInputRef.current.value = "";
      setText("");
      setPreview(null);
      setImage(null);
    } catch (err) {
      console.log("Error sending message " + err);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prevText) => prevText + emojiData.emoji);
  };

  return (
    <div className="mx-8 mb-4 relative">
      <div className="absolute w-24 top-0 -translate-y-[105%] left-4 transition-all duration-300">
        <img className="h-full w-auto" src={preview} />
        <button
          onClick={handleDeleteImage}
          className="absolute top-0 right-0 hover:cursor-pointer "
        >
          <X className="size-4" />
        </button>
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          onChange={handleTextChange}
          className="w-full p-2 input input-bordered"
          type="text"
          placeholder="type message here"
          value={text}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={imageInputRef}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 items-center justify-center ">
          <button
            ref={showPickerRef}
            className="hover:cursor-pointer"
            onClick={() => setShowPicker(!showPicker)}
            type="button"
          >
            <Smile />
          </button>
          <button
            type="button"
            onClick={() => {
              imageInputRef.current?.click();
            }}
            className="hover:cursor-pointer"
          >
            <Image />
          </button>
          <button type="submit" className="hover:cursor-pointer">
            <Send />
          </button>
        </div>
      </form>
      <div className="absolute bottom-12 right-0">
        {showPicker && (
          <div ref={emojiRef}>
            <EmojiPicker
              reactionsDefaultOpen={true}
              onReactionClick={handleEmojiClick}
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
