'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LedgerTableType } from "./types";
import { MessageAreaType } from "@/components/messageArea";
import { API_URLS } from "@/app/consts/apiUrls";

/**
 * useLedgerInquiry
 * 
 * URLのクエリパラメータからユーザーIDとCICを取得し、
 * ログイン処理を行い、指定されたAPIから帳票一覧を取得します。
 * 
 */
export function useLedgerInquiry() {
    const [ledgerItems, setLedgerItems] = useState<LedgerTableType[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageArea, setMessageArea] = useState<MessageAreaType>({ message: '', type: 'info' });
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
                    const loginResponse = await fetch(API_URLS.CREATE_SESSION_TOKEN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ USERID: userId, CIC: cic }),
                    });

                    if (!loginResponse.ok) {
                        console.error('ログインエラー');
                        setMessage('ログインエラー');
                        setLoading(false);
                        return;
                    }

                    // 帳票一覧取得
                    const listingResponse = await fetch(API_URLS.LEDGER_LISTING);

                    if (!listingResponse.ok) {
                        console.error('帳票一覧の取得エラー');
                        setMessage('帳票一覧の取得エラー');
                        setLoading(false);
                        return;
                    }

                    const data = await listingResponse.json();
                    setLedgerItems(data.items);
                } catch (error) {
                    console.error('XXXXXX:', error);
                    setMessage('XXXXXX');
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
          setMessageArea({ message: message, type: 'error' });
        }
    }, [message]);

    return { ledgerItems, loading, message, messageArea };
}
