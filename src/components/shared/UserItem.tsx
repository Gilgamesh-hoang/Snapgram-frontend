import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from "@/components/shared/Avatar.tsx";
import {Button} from "@/components/ui";
import {generateProfileLink, showConfirmDialog} from "@/utils/common.ts";
import {FollowTab} from "@/model/type.ts";
import {Loader} from "@/components/shared/index.tsx";
import {followUser, removeFollower, unfollowUser} from "@/services/follow.ts";
import Element = React.JSX.Element;

interface UserItemProps {
    imageUrl: string;
    name: string;
    nickname: string;
    userId: string;
    tab: FollowTab;
    onSuccess?: (userId: string) => void;
    isFollowed?: boolean;
    isGuest?: boolean;
    isMyself?: boolean;
}

const UserItem: React.FC<UserItemProps> = (
    {
        userId, imageUrl, name, nickname, tab, isGuest = true
        , onSuccess, isFollowed = false, isMyself = false
    }) => {
    const [isFollowing, setIsFollowing] = useState(isFollowed);
    const [isLoading, setIsLoading] = useState(false);
    const [label, setLabel] = useState<string | Element>('Theo dõi');
    const [action, setAction] = useState<'FOLLOW' | 'UNFOLLOW'>('FOLLOW');

    const updateLabelAndAction = () => {
        if (isLoading) {
            setLabel(<Loader/>);
            return;
        }
        if (tab === 'FOLLOWING') {
            if (isGuest) {
                if (isFollowing) {
                    setLabel('Hủy theo dõi');
                    setAction('UNFOLLOW');
                } else {
                    setAction('FOLLOW');
                    setLabel('Theo dõi');
                }
            } else {
                setLabel('Hủy theo dõi');
                setAction('UNFOLLOW');
            }
        } else if (tab === 'FOLLOWER') {
            if (isGuest) {
                if (isFollowing) {
                    setLabel('Hủy theo dõi');
                    setAction('UNFOLLOW');
                } else {
                    setAction('FOLLOW');
                    setLabel('Theo dõi');
                }
            } else {
                setLabel('Xoá');
            }
        }
    };
    useEffect(() => {
        updateLabelAndAction();
    }, [isFollowing, label, action]);

    const handleClick = () => {
        // myself profile
        if (!isGuest) {
            if (tab === 'FOLLOWING') {
                showConfirmDialog(`Hủy theo dõi @${nickname}?`,
                    'Hủy theo dõi',
                    'pi pi-exclamation-triangle',
                    handleUnfollow);
            } else if (tab === 'FOLLOWER') {
                showConfirmDialog(`Xoá @${nickname} khỏi danh sách người theo dõi?`,
                    'Xoá người theo dõi?',
                    'pi pi-exclamation-triangle',
                    handleRemoveFollower);

            }
        } else {
            if (action === 'FOLLOW') {
                handleFollow();
            } else if (action === 'UNFOLLOW') {
                showConfirmDialog(
                    `Hủy theo dõi @${nickname}?`,
                    'Hủy theo dõi',
                    'pi pi-exclamation-triangle',
                    handleUnfollow
                );
            }
        }
    }

    const handleRemoveFollower = () => {
        setIsLoading(true);
        removeFollower(userId).then(() => {
            setIsLoading(false);
            if (onSuccess) {
                onSuccess(userId);
            }
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const handleUnfollow = () => {
        setIsLoading(true);
        unfollowUser(userId).then(() => {
            setIsLoading(false);
            if (isGuest) {
                setIsFollowing(false)
            } else if (onSuccess) {
                onSuccess(userId);
            }
        }).catch(() => {
            setIsLoading(false);
        });
    };


    function handleFollow() {
        setIsFollowing(true);
        followUser(userId)
            .catch(() => {
                setIsFollowing(false);
            });
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to={generateProfileLink(nickname)}>
                    <Avatar
                        type={0}
                        imageUrl={imageUrl}
                        style={'size-11'}
                        name={name}
                    />
                </Link>
                <div className="flex flex-col gap-1">
                    <div className="flex">
                        <Link to={generateProfileLink(nickname)}>
                            <p className="text-sm font-semibold">@{nickname}</p>
                        </Link>
                        {tab === 'FOLLOWER' && !isFollowing && !isGuest && (
                            <>
                                <span className='px-1'>·</span>
                                <button onClick={handleFollow}
                                        className='text-[13px] font-normal leading-5 text-primary-500 hover:text-primary-600'>
                                    Theo dõi
                                </button>
                            </>
                        )}
                    </div>
                    <p className="text-sm font-extralight">{name}</p>
                </div>
            </div>

            {!isMyself && (
                <Button type="button" className="shad-button_primary min-w-20 bg-primary-500 px-3"
                        onClick={handleClick}
                >
                    {label}
                </Button>
            )}
        </div>
    );
}

export default UserItem;