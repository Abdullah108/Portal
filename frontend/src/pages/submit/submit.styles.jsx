import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
 .ant-table-wrapper{
width:80vw;
margin-left: 50%;
  transform: translateX(-50%);
  }
  .top {
    display: flex;
    width: 80%;
    margin: 80px auto;
    justify-content: space-between;
    
    margin-top:0px;
    h1{
      margin-left:0%;
    }
    button {
      padding: 10px 20px;
      border-radius:5px;
/* height:50px; s */
background-color:white;
font-size: 18px;
    }
    .black {
      color: #00a2ff;
      background-color: #fff;
      border: 1px solid #00a2ff;

    }
    .black:hover {
      background-color: #00a2ff!important;
     
      color: white;
    }
  }
  .sub {
    margin: 40px auto;
    margin-left: 10%;
    
  }
  .top a{
    font-size:22px;
    width:fit-content;
    padding:10px;
  }
  .form{
    width:80vw;
    padding:0 10%;
    display:grid;
    font-size:18px;
  }
  select{
    height:50px;
    border:1px solid #c7c7c78d;;
    padding:0 20px; 

  }
  input{
    border:1px solid #c7c7c78d;;
    height:50px;
    padding:0 20px; 
  }
  .brake{
    border-top:4px solid black;
    width:80%;
    margin:0  auto;
  }
  button {
      padding: 10px 20px;
      border-radius:5px;
/* height:50px; s */
background-color:white;
font-size: 18px;
    }
    .black {
      color: #00a2ff;
      background-color: #fff;
      border: 1px solid #00a2ff;

    }
    
  .header-fixed {
	background-color:#292c2f;
	box-shadow:0 1px 1px #ccc;
	padding: 20px 10%;
	height: 80px;
	color: #ffffff;
	box-sizing: border-box;
	top:-100px;

	-webkit-transition:top 0.3s;
	transition:top 0.3s;
}

.header-fixed .header-limiter {
	/* max-width: 1200px; */
	text-align: center;
	margin: 0 auto;
}

/*	The header placeholder. It is displayed when the header is fixed to the top of the
	browser window, in order to prevent the content of the page from jumping up. */

.header-fixed-placeholder{
	height: 80px;
	display: none;
}

/* Logo */

.header-fixed .header-limiter h1 {
	float: left;
	font: normal 28px Cookie, Arial, Helvetica, sans-serif;
	line-height: 40px;
	margin: 0;
}

.header-fixed .header-limiter h1 span {
	color: #5383d3;
}

/* The navigation links */

.header-fixed .header-limiter a {
	color: #ffffff;
	text-decoration: none;
 
}

.header-fixed .header-limiter nav {
	font:16px Arial, Helvetica, sans-serif;
	line-height: 40px;
	float: right;
}

.header-fixed .header-limiter nav a{
	display: inline-block;
	padding: 0 5px;
	text-decoration:none;
	color: #ffffff;
	opacity: 0.9;
}

.header-fixed .header-limiter nav a:hover{
	opacity: 1;
}

.header-fixed .header-limiter nav a.selected {
	color: #608bd2;
	pointer-events: none;
	opacity: 1;
}

/* Fixed version of the header */

body.fixed .header-fixed {
	padding: 10px 40px;
	height: 50px;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 1;
}

body.fixed .header-fixed-placeholder {
	display: block;
}

body.fixed .header-fixed .header-limiter h1 {
	font-size: 24px;
	line-height: 30px;
}

body.fixed .header-fixed .header-limiter nav {
	line-height: 28px;
	font-size: 13px;
}


/* Making the header responsive */

@media all and (max-width: 600px) {

	.header-fixed {
		padding: 20px 0;
		height: 75px;
	}

	.header-fixed .header-limiter h1 {
		float: none;
		margin: -8px 0 10px;
		text-align: center;
		font-size: 24px;
		line-height: 1;
	}

	.header-fixed .header-limiter nav {
		line-height: 1;
		float:none;
	}

	.header-fixed .header-limiter nav a {
		font-size: 13px;
	}

	body.fixed .header-fixed {
		display: none;
	}

}

/*
	 We are clearing the body's margin and padding, so that the header fits properly.
	 We are also adding a height to demonstrate the scrolling behavior. You can remove
	 these styles.
 */

body {
	margin: 0;
	padding: 0;
	height: 1500px;
}
.header-limiter a{
  margin-left:80px;
}
.header-limiter a:first-child{
  margin-left:0px;
}

@media screen and (max-width:650px){
	.none{
		display:none;
	}
	.form-control-plaintext{
		width:120%!important;
	}
	select{
		width:120%!important;

	}
	.one{
		margin-top:50px!important;
	}
	.tops{
		margin-top:50px!important;
	}
}

`;


