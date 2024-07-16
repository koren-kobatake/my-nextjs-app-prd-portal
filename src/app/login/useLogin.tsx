// TODO URLのクエリパラメータの仕様は不明（ユーザーIDのみでCICは不要？）

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageAreaType } from "@/app/types";
import { API_URLS } from "@/app/consts/apiUrls";

/**
 * useLogin
 * 
 * URLのクエリパラメータからユーザーIDとCICを取得し、
 * ログイン処理を行います。
 * 
 */
export function useLogin() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageArea, setMessageArea] = useState<MessageAreaType>({ text: '', type: 'info' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [cic, setCic] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const query = new URLSearchParams(window.location.search);
            setUserId(query.get('userId'));
            setCic(query.get('cic'));
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (userId && cic) {
                try {
                    // ログイン処理
                    const loginResponse = await fetch(API_URLS.LOGIN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ USERID: userId, CIC: cic }),
                    });

                    if (!loginResponse.ok) {
                        setMessage('ログインエラー');
                        setLoading(false);
                        return;
                    }

                    // ログイン成功
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('データ取得エラー:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId, cic]);

    useEffect(() => {
        if (message) {
          setMessageArea({ text: message, type: 'error' });
        }
    }, [message]);    

    return { loading, messageArea, isLoggedIn };
}
