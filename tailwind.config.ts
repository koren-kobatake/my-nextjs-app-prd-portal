/**
 * tailwind.config.ts
 * 
 * Tailwind CSSの設定を行うためのものです。
 * プロジェクト全体のスタイルガイドラインやカスタマイズを定義することができます。
 * 
 * 主な設定項目:
 * 
 * 1. content:
 *    - Tailwind CSSがスキャンするコンテンツファイルを指定します。
 *    - これにより、使用されているクラスのみがビルド時に含まれます。
 * 
 * 2. theme:
 *    - カスタムカラー、フォント、スペーシングなどを含むプロジェクト固有のデザインシステムを定義します。
 *    - これにより、プロジェクト全体で一貫したデザインを適用できます。
 * 
 * 3. plugins:
 *    - Tailwind CSSのプラグインを追加して機能を拡張します。
 *    - 例: フォームスタイルのリセット、カスタムグリッドシステムなど
 * 
 * 使用例:
 * - この設定ファイルにカスタム設定を追加することで、Tailwind CSSのデフォルト設定を上書きし、プロジェクトに適したスタイルを適用できます。
 * 
 * 注意:
 * - このファイルの変更を保存した後、開発サーバーを再起動する必要があります。
 */
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config