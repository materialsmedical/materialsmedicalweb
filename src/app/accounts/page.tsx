export default function page() {
  return (
    <div className="flex justify-center" dir="rtl">
      <div className="w-full max-w-[512px] mt-4">
        <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">الاسم</dt>
              <dd className="text-gray-700 sm:col-span-2">
                طبيب الاسنان محمد الحسناوي
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">الموقع</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <a href="https://heylink.me/mohammedalhosnawy">
                  https://heylink.me/mohammedalhosnawy
                </a>
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">التيليكرام</dt>
              <dd className="text-gray-700 sm:col-span-2">
                <a href="https://t.me/moh223310">
                  @moh223310
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
