# page说明  
    "pages/login/login", //登录界面(微信授权登录、游客登录、管理员登录)
    "pages/index/index", //资讯展示页(微信授权用户和游客登录成功默认跳转的页面)
    "pages/home/home", //灾情上报页面（灾情类型、定位、描述、图片、视频）
    "pages/myself/myself", //个人页面（微信授权登录用户和游客共用。包括上报灾情详情查看、上报灾情撤销和账号注销）
    "pages/disaster/disaster", //上报灾情详情页面
    "pages/rightDisasterInfo/rightDisasterInfo", //灾情讯息展示界面（页面样式被管理员的灾情讯息管理预览详情复用）在index中
    "pages/admin/admin", //管理员登录界面(顶级管理员和普通管理员共用)
    "pages/adminMenu/adminMenu", //普通管理员登录成功的界面(上报灾情信息管理、灾情资讯管理、管理员账号改密、管理员账号注销)
    "pages/manageRightDisasterInfo/manageRightDisasterInfo", //灾情资讯管理
    "pages/addRightDisasterInfo/addRightDisasterInfo", //添加灾情资讯
    "pages/rightDisasterInfoManage/rightDisasterInfoManage", //灾情资讯管理详情页
    "pages/creatSalvationScheme/creatSalvationScheme", //按应急资源配置决策模型生成救援表
    "pages/rightDisasterInfoOnSalvation/rightDisasterInfoOnSalvation", //救援表生成页面预览已核实的灾情
    "pages/disasterExecutionInfo/disasterExecutionInfo", //救援表具体详情页
    "pages/adminchangePwd/adminchangePwd", //管理员账号改密界面
    "pages/adminWithDrawCode/adminWithDrawCode", //管理员账号注销
    "pages/superAdminMenu/superAdminMenu" //顶级管理员登录成功的界面{进入普通管理员模式(会跳转到普通管理员界面，但是会隐层普通管理员的改密和注销按钮)、管理普通管理员信息和管理员账号注册}
    "pages/superManageAdmin/superManageAdmin", //管理普通管理员信息界面{管理员预览——详情页、增加管理员}
    "pages/addadmin/addadmin", //增加管理员界面
    "pages/adminInfo/adminInfo", //普通管理员详情查看(修改管理员信息、删除管理员)
    "pages/superAdminchangePwd/superAdminchangePwd", //超级管理员账号改密界面
    "pages/manageDisaster/manageDisaster", //管理上报灾情信息(微信授权用户和游客上报的灾情讯息简略预览——点击对应条目就可以跳转对应页面查看详情)
    "pages/userDisasterInfo/userDisasterInfo" //微信授权登录用户上报的灾情信息详情
    "pages/visitorDisasterInfo/visitorDisasterInfo", //游客上报的灾情信息详情
# 代码中变量说明

  微信小程序gender:0-未知；1-男；2-女
  小程序中的所有_openid就是unionid

# 亮点

## 获取用户当前经纬度

```
  获取用户当前定位：
  wx.getLocation({
  altitude: 'altitude', //altitude: 'altitude',
        type: 'wgs84', //
  ...
  })
```
当灾情上报的位置就是用户所在位置时，可以一键获取当前位置信息

## 通过经纬度逆解析成地址和名称

  通过经纬度逆解析成城市定位：使用WebService API

  ```
  wx.request(url: 'https://apis.map.qq.com/ws/geocoder/v1/?location='+that.data.latitude+','+that.data.longitude+'&key=SVMBZ-7JV64-TZPUN-XNHXG-5UOMT-VWB7K',)
  ```

## 腾讯位置服务地图选点

通过官网申请Key，和小程序后台管理安装插件，使得小程序可以直接调用WebService API，使用地图选点功能，使得灾情上报的地理位置可选

## 按地理位置显示灾情讯息

## 微信小程序意外退出，自动退出登录，注销已经登录的用户信息

## 上传图片批量命名

## page之间数据透传

## 任何组件更改数据——输入的信息都会预存储，避免受网络状况影响，提交失败丢失状态，从而需要重新输入的情况


# 伪代码

## 上传图片批量命名

## 

# 平台使用说明

## 普通管理员(其一)

```
commonAdmin
admin
```

## 超级管理员

```
18515117106
yzy
```

# 数据库表规范：

## adminSet

## 不可为空

账号Code
密码Pwd
是否是超级管理员isSuper

# 使用指栏：

## 1.

从超级管理员菜单页跳转到普通管理员界面就无法跳回超级管理员界面


# 收获

wxml中wx:for srollview的下标就是index

云数据库集合不允许创建所有用户可写的自定义数据权限，非集合创建者需要通过云函数去修改更新数据库集合——云函数中对云数据库具有绝对控制权




# 创新点

获取用户当前经纬度，通过经纬度逆解析成城市定位；腾讯位置服务地图选点定位；按地理位置显示灾情讯息；微信小程序意外退出，自动退出登录，注销已经登录的用户信息；上传图片批量命名；page之间数据透传——页面跳转时携带数据传输；任何组件更改数据——输入的信息都会预存储，避免受网络状况影响，提交失败丢失状态，从而需要重新输入的情况；