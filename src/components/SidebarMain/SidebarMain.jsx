import ReviewListWrapper from '@components/ReviewListWrapper';

function SidebarMain() {
  return (
    <div
      className="sider-list-container"
      style={{
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <ReviewListWrapper />
    </div>
  );
}

export default SidebarMain;
