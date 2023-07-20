import React from 'react';
import styles from './cardpage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchUser } from '../../store/reducers/ActionCreators';
import { Button } from '../Button';
import { AuthSpinner } from '../Auth/AuthSpinner';
import { usersSlice } from '../../store/reducers/usersReducer';
import { Size } from '../MainPage/Header';



export function CardPage() {
  const { user, loading, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('authToken') || JSON.stringify(''));
  const [size, setSize] = React.useState<Size>({ width: window.innerWidth });


  React.useEffect(() => {
    if (!token) navigate('/not-found-auth');
    const cardId = Number(id)
    dispatch(fetchUser(cardId));
  }, [id]);

  React.useEffect(() => {
    if (!loading) {
      if (error) navigate('/not-found');
    }
  }, [loading, error]);

  React.useEffect(() => {
    window.addEventListener('resize', resizeHanlder);
    return () => {
      window.removeEventListener('resize', resizeHanlder);
    }
  }, []);

  const resizeHanlder = () => {
    setSize({
      width: window.innerWidth,
    });
  };

  function handleClickBack() {
    navigate('/users/page/1')
  }

  function handleLogOut() {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
    dispatch(usersSlice.actions.usersClean());
  }

  return (
    <>
      {loading
        ?
        <div className={styles.spinner_wrap}>
          <AuthSpinner className={styles.spinner} />
        </div>
        :
        <>
          {user &&
            <>
              <header className={styles.header}>
                <div className={['container', styles.cardpage_container].join(' ')}>
                  {size.width <= 768
                    ?
                    <button className={styles.btn_back} onClick={() => handleClickBack()}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.8375 27.0013C22.6881 27.0018 22.5405 26.9688 22.4055 26.9048C22.2705 26.8407 22.1516 26.7473 22.0575 26.6313L17.2275 20.6313C17.0804 20.4523 17 20.2279 17 19.9963C17 19.7646 17.0804 19.5402 17.2275 19.3613L22.2275 13.3613C22.3972 13.157 22.6411 13.0286 22.9056 13.0042C23.17 12.9799 23.4333 13.0615 23.6375 13.2313C23.8417 13.401 23.9701 13.6449 23.9945 13.9093C24.0189 14.1738 23.9372 14.437 23.7675 14.6413L19.2975 20.0013L23.6175 25.3613C23.7398 25.508 23.8174 25.6868 23.8413 25.8763C23.8652 26.0659 23.8343 26.2583 23.7522 26.4308C23.6702 26.6034 23.5404 26.7488 23.3783 26.8499C23.2162 26.9509 23.0285 27.0035 22.8375 27.0013Z" fill="#F8F8F8" />
                      </svg>
                    </button>
                    :
                    <Button text={'Назад'} classNameLocal={styles.btn_back} onClick={handleClickBack} />
                  }
                  <div className={styles.user_block}>
                    <img className={styles.avatar} src={user.avatar} alt="avatar" />
                    <div className={styles.user_info}>
                      <h1 className={styles.title}>{`${user.first_name} ${user.last_name}`}</h1>
                      <p className={styles.descr}>Партнер</p>
                    </div>
                  </div>
                  {size.width <= 768
                    ?
                    <button className={styles.logout} onClick={() => handleLogOut()}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.79 24.29C19.18 24.68 19.81 24.68 20.2 24.29L23.79 20.7C23.8827 20.6075 23.9563 20.4976 24.0064 20.3766C24.0566 20.2557 24.0824 20.126 24.0824 19.995C24.0824 19.864 24.0566 19.7343 24.0064 19.6134C23.9563 19.4924 23.8827 19.3825 23.79 19.29L20.2 15.7C20.013 15.513 19.7594 15.408 19.495 15.408C19.2306 15.408 18.977 15.513 18.79 15.7C18.603 15.887 18.498 16.1406 18.498 16.405C18.498 16.6694 18.603 16.923 18.79 17.11L20.67 19H12C11.45 19 11 19.45 11 20C11 20.55 11.45 21 12 21H20.67L18.79 22.88C18.4 23.27 18.41 23.91 18.79 24.29ZM27 11H13C12.4696 11 11.9609 11.2107 11.5858 11.5858C11.2107 11.9609 11 12.4696 11 13V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V14C13 13.45 13.45 13 14 13H26C26.55 13 27 13.45 27 14V26C27 26.55 26.55 27 26 27H14C13.45 27 13 26.55 13 26V24C13 23.45 12.55 23 12 23C11.45 23 11 23.45 11 24V27C11 28.1 11.9 29 13 29H27C28.1 29 29 28.1 29 27V13C29 11.9 28.1 11 27 11Z" fill="#F8F8F8" />
                      </svg>
                    </button>
                    :
                    <Button text={'Выход'} classNameLocal={styles.logout} onClick={handleLogOut} />
                  }
                </div>
              </header>
              <main>
                <section className={styles.section}>
                  <div className={['container', styles.section_container].join(' ')}>
                    <div className={styles.wrap}>
                      <div className={styles.descr_wrap}>
                        <p className={styles.section_descr}>
                          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
                        </p>
                        <p className={styles.section_descr}>
                          В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
                        </p>
                        <p className={styles.section_descr}>
                          Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
                        </p>
                      </div>
                      <div className={styles.contacts}>
                        <a className={[styles.link, styles.phone].join(' ')} href='tel:+7 (954) 333-44-55'>+7 (954) 333-44-55</a>
                        <a className={[styles.link, styles.email].join(' ')} href={`"mailto:${user.email}"`}>{user.email}</a>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </>
          }
        </>
      }
    </>
  );
}
function dispatch() {
  throw new Error('Function not implemented.');
}

function authFetchingSuccess(arg0: string): any {
  throw new Error('Function not implemented.');
}

