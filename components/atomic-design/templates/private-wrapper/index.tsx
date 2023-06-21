'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { initJwtStore } from 'store/state-management/mobx/mobx-domain-store';

import { Button } from '../../atoms/Button-SC';

type Props = {
  children: React.ReactNode;
};

export default function PrivateWrapper({ children }: Props) {
  const [displayContent, setDisplayContent] = useState(false);
  const router = useRouter();
  const store = initJwtStore();
  const token = store.getJwt;

  function authCheck() {
    if (token === '') {
      router.push('/login');
      return;
    }

    setDisplayContent(true);
  }

  function logout() {
    store.setJwt('');
    router.refresh();
  }

  useEffect(() => {
    authCheck();
  });

  return (
    <>
      {displayContent ? (
        <div>
          <div>
            <Button label="Logout" size="small" onClick={logout} />
          </div>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}