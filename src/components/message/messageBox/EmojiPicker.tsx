import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isOpen?: boolean;
}
interface Emoji {
  native: string;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({ inputRef, isOpen=false }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(isOpen);

  // This function is triggered when an emoji is selected from the emoji picker
  const handlePickEmoji = (emoji: Emoji) => {
    // Focus on the input field
    inputRef.current?.focus();
    // Set the cursor position in the input field
    inputRef.current?.setSelectionRange(inputRef.current?.selectionStart || 0, inputRef.current?.selectionEnd || 0);
    // Insert the selected emoji at the current cursor position in the input field
    inputRef.current?.setRangeText(emoji.native, inputRef.current?.selectionStart || 0, inputRef.current?.selectionEnd || 0, 'end');
  };


  return (
    <div className="relative ">
      <button onClick={() => setIsPickerOpen(!isPickerOpen)}
              title={'Chọn biểu tượng cảm xúc'}
              className="flex size-11 items-center justify-center rounded-full hover:bg-primary-500 hover:text-white">
        <BsEmojiSmile size={20} />
      </button>
      {
        isPickerOpen && (
          <div className="absolute bottom-[54px] left-[-30px]">
            <Picker
              data={data}
              previewPosition="none"
              onEmojiSelect={handlePickEmoji}
            />
          </div>
        )
      }
    </div>
  );
};

export default EmojiPicker;