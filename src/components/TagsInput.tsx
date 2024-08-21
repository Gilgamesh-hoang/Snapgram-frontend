import React, {FC} from "react";

interface TagsInputProps {
    selectedTags: (tags: string[]) => void;
}

const TagsInput: FC<TagsInputProps> = ({selectedTags}) => {
    const [tags, setTags] = React.useState<string[]>([]);

    const removeTags = (indexToRemove: number) => {
        const newValues = [...tags.filter((_, index) => index !== indexToRemove)];
        setTags(newValues);
        selectedTags(newValues);
    };
    const addTags = (event) => {
        if (tags.length > 20)
            return;

        const value = event.target.value.toLowerCase().trim();
        if (value && !tags.includes(value) && value.length <= 20) {
            setTags([...tags, value]);
            selectedTags([...tags, value]);
        }
        event.target.value = "";
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon'
                              onClick={() => removeTags(index)}
                        >
                          x
                        </span>
                    </li>
                ))}
            </ul>
            {/*<div className='flex items-center'>*/}
            <input
                type="text"
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                onKeyDown={event => event.key === "Enter" ? event.preventDefault() : null}
                placeholder="Nhấn Enter để thêm tag"
                maxLength={20}
            />
            {/*</div>*/}
        </div>
    );
};
export default TagsInput;