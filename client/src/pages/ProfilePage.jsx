import styled from 'styled-components';
import '../styles/Profile.css';
import '../styles/Category.css';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import ButtonComponent from '../components/ButtonComponent';
import FormComponent from '../components/FormComponent';
import ArticleGrid from '../components/ArticleGrid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GetCategories from '../components/GetCategories'

const StyledSpan = styled.span`
    background: -webkit-linear-gradient(#C81C5D, #813082, #4D3D9A);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 1000;
`;

function ProfilePage(props) {
  if (props.loading) {
    return (
      <div style={{ minHeight: '100svh' }}>
        <h1>loading...</h1>
      </div>
    )
  }
  return (
    <div style={{ marginTop: '12rem' }}>
      <div className="userProfile">
        <div className="user-details">
          {props.userEdit ? (
            <div className="userEdit">
              <h1>Edit your details</h1>
              <input type="text" ref={props.editUserNameRef} defaultValue={props.username} placeholder='Username' />
              <input type="text" ref={props.editUserEmailRef} defaultValue={props.email} placeholder='Email' />
              <div className="passwordContainer">
                <input type={props.type} ref={props.editUserPasswordRef} style={{ width: '100%' }} placeholder=' New password' />
                {props.passwordVisible ?
                  <i className="eyeIcon" onClick={() => props.showPassword()}>
                    <VisibilityIcon />
                  </i> :
                  <i className="eyeIcon" onClick={() => props.showPassword()}>
                    <VisibilityOffIcon />
                  </i>
                }
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <ButtonComponent
                    bgColor="green"
                    onClick={() => props.editUser() && props.onCancelUserClick}
                    txtColor="black"
                    text="Save"
                  />
                  <ButtonComponent
                    bgColor="#3c6cb9"
                    txtColor="black"
                    text="Cancel"
                    onClick={props.onCancelUserClick}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>Welcome to your profile, <StyledSpan>{props.username}</StyledSpan></h1>
              <p>Here you can Edit your profile details, create your Articles, see your posted Articles and see your list of Articles.</p>
              <ButtonComponent
                onClick={props.userEditMode}
                text='Edit user data'
                bgColor='orange'
                txtColor='black'
              />
            </>
          )}
        </div>
        <FormComponent>
          <h1>Create Article</h1>
          <input type="text" name="title" ref={props.nameRef} placeholder="Title" />
          <textarea name="description" ref={props.descriptionRef} style={{ width: '65%' }} rows="4" placeholder="Description" />
          <input style={{display: "none"}} type="text" name="" ref={props.episodeRef} placeholder="" />
          <input type="text" name="image url" ref={props.urlRef} placeholder="Image url" />
          <div className="categorySection">
            {props.dataForCategories.map((category) => (
              <button className="categoryButton" key={category.id} style={category?.isSelected ? { background: "#3c6cb9" } : null} onClick={() => props.onCategoryClick(category.name)}>
                {category.name}
              </button>
            ))}
          </div>
          <input style={{display: "none"}} type="text" name="" ref={props.materialsRef} placeholder="" />
          {props.error && <p style={{ color: '#D2122E', fontWeight: '1000' }}>{String(props.error)}</p>}
          <ButtonComponent
            bgColor="#3c6ca8"
            onClick={props.onCreateClick}
            txtColor="black"
            text="Create"
          />
        </FormComponent>
      </div>
      <div className="userArticles">
        <h1 style={{ textAlign: 'center' }}>My Articles</h1>
        <ArticleGrid>
          {props.dataForUserArticles?.map((Article) => (
            <div
              className="gridItem"
              key={Article.id}
            > {Article.editMode ? (
              <>
                <FormComponent>
                  <input type="text" name="title" ref={props.editNameRef} defaultValue={Article.name} placeholder="Title" />
                  <textarea name="description" ref={props.editDescriptionRef} defaultValue={Article.description} style={{ width: '65%' }} rows="4" placeholder="Description" />
                  <input type="text" name="" ref={props.imageUrlRef} defaultValue={Article.imageUrl} placeholder="Image url" />
                  <div className="categorySection">
                    {props.dataForUpdatedCategories.map((category) => (
                      <button className="categoryButton" key={category.id} style={category?.isSelected ? { background: "#3c6cb9" } : null} onClick={() => props.onCategoryUpdateClick(category.name)}>
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <ButtonComponent
                    bgColor="green"
                    onClick={() => props.updateArticle(Article.id)}
                    txtColor="black"
                    text="Save"
                  />
                  <ButtonComponent
                    bgColor="red"
                    onClick={() => props.onCancelClick(Article.id)}
                    txtColor="black"
                    text="Cancel"
                  />
                </FormComponent>
              </>
            ) : (
              <>
                <div className="iframeWrapper">
                <img
                  width={"100%"}
                  src={`${Article?.imageUrl}`}
                  alt="article image"
                />
                </div>
                <Link to={`/Article/${Article.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <h3>{Article.name}</h3>
                    <p>{Article.owner.name}</p>
                    {/* <p>Episode: {Article.episode}</p> */}
                    <GetCategories array={Article.categories} />
                    <span>Created: {DateUtils.getAgeFromDate(new Date(Article.createdAt))} ago</span>
                  </div>
                </Link>
                <ButtonComponent
                  bgColor="#3c6ca8"
                  onClick={() => props.editModeTrue(Article.id)}
                  txtColor="black"
                  text="Edit"
                />
                <ButtonComponent
                  bgColor="red"
                  onClick={() => props.onDeleteClick(Article.id)}
                  txtColor="black"
                  text="Delete"
                />
              </>
            )}
            </div>
          ))}
        </ArticleGrid>
        <h1 style={{ textAlign: 'center' }}>My Article List</h1>
        <ArticleGrid>
          {props.dataForArticleList?.map((Article) => (
            <div
              className="gridItem"
              key={Article.id}
            >
              <>
                <div className="iframeWrapper">
                <img
                  width={"100%"}
                  src={`${Article?.imageUrl}`}
                  alt="article image"
                />
                </div>
                <Link to={`/Article/${Article.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div>
                    <h3>{Article.name}</h3>
                    <p>Owner: {Article.owner.name}</p>
                    <GetCategories array={Article.categories} />
                    <span>Created: {DateUtils.getAgeFromDate(new Date(Article.createdAt))} ago</span>
                  </div>
                </Link>
                <ButtonComponent
                  onClick={() => props.onDeleteFromList(Article.id)}
                  bgColor="red"
                  txtColor="black"
                  text="Remove from list"
                />
              </>
            </div>
          ))}
        </ArticleGrid>
      </div>
    </div>
  )
}
export default ProfilePage;
