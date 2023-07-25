import Link from "@/components/elements/Link";
import TatebouLayout from "@/components/layouts/Tatebou/Layout";
export default function Tatebou() {
    return (
        <TatebouLayout>
            <div>
                <p>
                    迫真縦棒は<Link href="https://yamad.me/">山D</Link>によって提供されている短縮(?)URLサービスです
                </p>
                <p>山Dは最低限のAPIしか作らなかったのでウェブUIを開発しました。</p>
            </div>

            <div>
                <div className="daisy-form-control w-full">
                    <label className="daisy-label">
                        <span className="daisy-label-text">元URL</span>
                    </label>
                    <input
                        type="text"
                        placeholder="短縮するURLを入力して下さい"
                        className="daisy-input-bordered daisy-input w-full"
                    />
                    <label className="daisy-label">
                        <span className="daisy-label-text-alt">
                            <code className=" text-sm text-pink-600">http</code>から始まるURLを入力して下さい
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                <button className="!daisy-btn-info !daisy-btn-active">作成</button>
                <button className="!daisy-btn-neutral !daisy-btn-active">履歴</button>
                <button className="!daisy-btn-error !daisy-btn-active">クリア</button>
            </div>

            <div className="daisy-form-control w-full">
                <label className="daisy-label">
                    <span className="daisy-label-text">結果</span>
                </label>
                <input type="text" placeholder="結果がここに出力されます" className="daisy-input-bordered daisy-input w-full" />
            </div>

            <div>
                <p>結果をテスト</p>
                <div className="flex gap-2 child:daisy-btn-sm child:daisy-btn  child:!text-white">
                    <button className="!daisy-btn-primary !daisy-btn-active">コピー</button>
                    <button className="!daisy-btn-secondary !daisy-btn-active">テスト</button>
                </div>
            </div>
        </TatebouLayout>
    );
}
