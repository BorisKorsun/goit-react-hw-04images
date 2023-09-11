import { LoaderContainer } from './Loader.styled';
import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderContainer>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#3f51b5']}
      />
    </LoaderContainer>
  );
};

export default Loader;
