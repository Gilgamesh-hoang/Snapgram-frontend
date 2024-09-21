import {Comment} from "@/model/type.ts";

const useNode = () => {
    const insertNode = (tree: Comment[], parentId: string | null, item: Comment | Comment[], placement: 'BEGIN' | 'END' = 'BEGIN'): Comment[] => {
        const temp = [...tree];
        if (parentId === null) {
            if (placement === 'BEGIN') {
                Array.isArray(item) ? temp.unshift(...item) : temp.unshift(item);
            } else {
                Array.isArray(item) ? temp.push(...item) : temp.push(item);
            }
            return temp;
        }
        temp.forEach(cmt => {
            if (cmt.id === parentId) {
                if (!cmt.items) {
                    cmt.items = [];
                }
                if (placement === 'BEGIN') {
                    Array.isArray(item) ? cmt.items.unshift(...item) : cmt.items.unshift(item);
                } else {
                    Array.isArray(item) ? cmt.items.push(...item) : cmt.items.push(item);
                }
                return temp;
            }
        });
        return temp;
    };

    const editNode = (tree: Comment[], commentId: string, value: string): Comment[] => {
        const temp = [...tree];
        for (let i = 0; i < temp.length; i++) {
            const currentItem = temp[i];
            const items = currentItem.items;

            if (currentItem.id === commentId) {
                currentItem.content = value;
                return temp;
            } else if (items && items.length > 0) {
                for (let j = 0; j < items.length; j++) {
                    const item = items[j];
                    if (item.id === commentId) {
                        item.content = value;
                        return temp;
                    }
                }
            }
        }
        return temp;
    };

    const deleteNode = (tree: Comment[], id: string): Comment[] => {
        const temp = [...tree];
        for (let i = 0; i < temp.length; i++) {
            const currentItem = temp[i];
            const items = currentItem.items;

            if (currentItem.id === id) {
                temp.splice(i, 1);
                return temp;
            } else if (items && items.length > 0) {
                for (let j = 0; j < items.length; j++) {
                    const item = items[j];
                    if (item.id === id) {
                        items.splice(j, 1);
                        return temp;
                    }
                }
            }
        }
        return temp;
    };


    return {insertNode, editNode, deleteNode};
};

export default useNode;