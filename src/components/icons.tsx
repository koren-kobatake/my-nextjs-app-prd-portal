import * as React from 'react'
import { LucideProps, AlertTriangle, ArrowRight, Home, Settings, User } from 'lucide-react'

export const Icons = {
  logo: (props: LucideProps) => <Home {...props} />, // ロゴアイコン
  alert: (props: LucideProps) => <AlertTriangle {...props} />, // アラートアイコン
  arrowRight: (props: LucideProps) => <ArrowRight {...props} />, // 右矢印アイコン
  settings: (props: LucideProps) => <Settings {...props} />, // 設定アイコン
  user: (props: LucideProps) => <User {...props} />, // ユーザーアイコン
}

export default Icons
