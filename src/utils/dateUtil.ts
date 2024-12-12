export const formatDateString = (dateString: string):string => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("vi-VN", options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} lúc ${time}`;
}
export const multiFormatDateString2 = (timestamp: string = ""): string => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date: Date = new Date(timestampNum * 1000);
    const now: Date = new Date();

    const diff: number = now.getTime() - date.getTime();
    const diffInSeconds: number = diff / 1000;
    const diffInMinutes: number = diffInSeconds / 60;
    const diffInHours: number = diffInMinutes / 60;
    const diffInDays: number = diffInHours / 24;

    const isSameYear = now.getFullYear() === date.getFullYear();

    if (Math.floor(diffInDays) >= 30) {
        if (isSameYear) {
            // Nếu cùng năm thì chỉ hiển thị ngày và tháng
            const options: Intl.DateTimeFormatOptions = {
                month: "short",
                day: "numeric",
            };

            return date.toLocaleDateString("vi-VN", options);
        } else {
            // Nếu khác năm thì hiển thị đầy đủ ngày, tháng và năm
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "short",
                day: "numeric",
            };

            return date.toLocaleDateString("vi-VN", options);
        }
    }

    switch (true) {
        case Math.floor(diffInDays) >= 1 && diffInDays < 30:
            return `${Math.floor(diffInDays)} ngày`;
        case Math.floor(diffInHours) >= 1:
            return `${Math.floor(diffInHours)} giờ`;
        case Math.floor(diffInMinutes) >= 1:
            return `${Math.floor(diffInMinutes)} phút`;
        default:
            return "Vừa xong";
    }
};
