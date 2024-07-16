/**
 * CSSクラス名を効率的に結合し、重複や無駄なクラス名を取り除くためのユーティリティ関数を提供します。
 * Tailwind CSSを使用するプロジェクトで特に役立ちます。
 * 
 * - `clsx` ライブラリを使用して条件付きでクラス名を結合します。
 * - `twMerge` ライブラリを使用してTailwind CSSのクラス名を適切にマージします。
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * クラス名を効率的に結合し、最適化されたクラス名の文字列を生成します。
 * 
 * @param {...ClassValue[]} inputs - 結合するクラス名のリスト
 * @returns {string} - 最適化されたクラス名の文字列
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
