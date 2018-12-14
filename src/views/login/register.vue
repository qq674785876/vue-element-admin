<template>
  <div class="register-container">
    <div class="step">
      <el-row>
        <el-col :span="24">
          <div class="step-title">
            <i class="step-num">1</i> 填写基本信息
          </div>
        </el-col>
        <el-row class="form-box">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" auto-complete="off" label-position="left">
            <el-col :span="10" :xs="24" class="left-box">
              <el-form-item prop="email">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="registerForm.email"
                  placeholder="注册邮箱"
                  name="email"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="code">
                <span class="svg-container">
                  <svg-icon icon-class="lock" />
                </span>
                <el-input
                  v-model="registerForm.code"
                  placeholder="请输入验证码"
                  name="code"
                  type="tel"
                  maxlength="6"
                  auto-complete="off"
                  style="width: 140px;"
                  @keyup.enter.native="handleLogin"
                />
                <el-button size="mini" style="padding: 7px 5px;float: right;" @click="getVerifyCode">{{ verifyCodeText }}</el-button>
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="登录密码"
                  name="password"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="qrPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.qrPassword"
                  type="password"
                  placeholder="确认密码"
                  name="qrPassword"
                  auto-complete="on"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xs="0" style="height: 1px;" class="line"/>
            <el-col :span="10" :xs="24" class="right-box">
              <el-form-item prop="wechat" label="微信:">
                <el-input
                  v-model="registerForm.wechat"
                  name="wechat"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="company" label="公司:">
                <el-input
                  v-model="registerForm.company"
                  name="company"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="imNumber" label="QQ:">
                <el-input
                  v-model="registerForm.imNumber"
                  name="imNumber"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="job" label="职位:">
                <el-input
                  v-model="registerForm.job"
                  name="job"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-checkbox v-model="checked">已阅读</el-checkbox><span style="color: blue;cursor: pointer;font-size: 14px;" @click="dialogVisible = true">《应用上传协议》</span>
              <el-button-group>
                <el-button type="primary" size="mini" @click="goLogin()">返回</el-button>
                <el-button :loading="loading" type="primary" size="mini" @click="next()">下一步</el-button>
              </el-button-group>
            </el-col>
          </el-form>
        </el-row>
      </el-row>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      class="agreement-box"
      width="100%">
      <div class="app-agreement">
        <div class="agreement-text">
          <section data-role="outer" label="Powered by 365editor" style="font-family:微软雅黑;font-size:16px;"><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">一、服务条款的确认和接纳</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 为获得[小鸟壁纸（即360壁纸）]（以下简称“小鸟壁纸”或本平台）提供基于互联网的相关服务，服务使用人(以下称“用户”)必须同意本协议的全部条款并按照页面上的提示完成注册程序。如果用户在注册程序过程中点击“确认上传”按钮即表示用户与[小鸟壁纸 ]达成协议，完全接受本协议项下的全部条款。 除本服务协议外，您应同时阅读并接受“上传须知”及“版权保护指引”，该“上传须知””及“版权保护指引”为本协议之不可分割的一部分。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 二、使用规则</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1、用户应遵守以下法律及法规</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 用户同意遵守《中华人民共和国著作权法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《信息网络传播权保护条例》等有关计算机及互联网规定的法律、法规、实施办法。在任何情况下，[小鸟壁纸 ]合理地认为用户的行为可能违反上述法律、法规，[小鸟壁纸 ]可以在任何时候，不经事先通知终止向该用户提供服务，用户不得以此为理由追究小鸟壁纸的任何责任。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 您承诺并保证：</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) 您对上传至本平台的作品具有完全知识产权或经过合法授权；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) 如您上传至本平台的作品因知识产权引起任何纠纷，完全由您个人承担，平台不承担任何责任；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (c) 如本平台因您的行为导致被第三人追究责任，您有义务自行承担费用、采取一切措施维护本平台的合法权益，包括但不限于出庭作证、提交相关书面证词等；在平台被判决向第三人承担相应法律责任后，有权向您追偿。届时您不仅将承担平台向第三人承担的赔偿费用，还将承担平台因实现权利而产生的必要合理费用，包括但不限于诉讼费、公证费、调查费、律师费等。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2、禁止用户从事以下行为：</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.1 使用[小鸟壁纸 ]服务发送或传播敏感信息和违反国家法律制度的信息，包括但不限于下列信息:</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) 反对宪法所确定的基本原则的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (c) 损害国家荣誉和利益的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (d) 煽动民族仇恨、民族歧视，破坏民族团结的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (e) 破坏国家宗教政策，宣扬邪教和封建迷信的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (f) 散布谣言，扰乱社会秩序，破坏社会稳定的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (g) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (h) 侮辱或者诽谤他人，侵害他人合法权益的；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (i) 含有法律、行政法规禁止的其他内容的。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.2 使用[ 小鸟壁纸]提供的服务进行任何非法、淫秽、色情及其他违反公序良俗之活动，包括但不限于非法传销、诈骗、侵权、反动行为等。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2.3 对[小鸟壁纸 ]服务的任何部分或服务之使用或获得进行复制、拷贝、出售，或利用[小鸟壁纸]服务进行调查、广告或其他商业目的，但[小鸟壁纸 ]对特定服务另有适用指引或规定的除外。 在任何情况下，[小鸟壁纸 ]合理地认为用户的行为可能违反上述规定，[小鸟壁纸 ]可以在任何时候，不经事先通知终止向该用户提供服务。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 三、 内容权利</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 用户上载的应用作品是指用户在本网站上载或发布的游戏或其它任何形式的内容包括文字、图片、音频、视频等。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 除非[小鸟壁纸 ]收到相反通知，[小鸟壁纸 ]将用户视为其在本网站上载或发布的内容的版权拥有人。用户在本网站上载或发布内容即视为其同意授予[小鸟壁纸 ]所有上述内容的在全球范围内的不可撤销的、无限期的、可转让的非独家使用权，许可[小鸟壁纸]对前述内容进行任何形式的复制、修改、出版、发行及以其他方式使用或者授权第三方进行复制、修改、出版、发行及以其他方式使用。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [小鸟壁纸]有权将用户上传的壁纸以付费下载的形式对外提供，所得收益将由本平台和上传用户分成；对外付费下载的价格由本平台设定，并且本平台有权对定价进行调整，用户对此不持异议。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 因用户进行上述内容在本网站的上载或发布，而导致任何第三方提出索赔要求或衍生的任何损害或损失，由用户承担全部责任。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 如因用户上传至本平台的作品被第三方声称侵犯其任何权利的，本平台有权随时将相关作品删除而无经过上传用户的同意；同时，本平台有权追回该用户因上传该等作品而取得的任何收益，包括但不限于收费分成、虚拟币等。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 内容权利详情请见：“上传须知”及“版权保护指引”。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 四、隐私保护</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 保护用户隐私是[小鸟壁纸 ]的重点原则，[小鸟壁纸 ]保证不对外公开或向第三方提供用户注册资料及用户在使用服务时存储在[小鸟壁纸 ]的非公开内容，但下列情况除外：</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1、事先获得用户的明确授权；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2、根据有关的法律法规要求；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3、按照相关政府主管部门及司法机关的要求；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 4、为维护用户及社会公众的利益；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 5、为维护[小鸟壁纸 ]的合法权益。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [小鸟壁纸 ]可能会与第三方合作向用户提供相关的服务，在此情况下，如该第三方同意承担与[小鸟壁纸 ]同等的保护用户隐私的责任，则[小鸟壁纸 ]可将用户的注册资料等提供给该第三方。 在不透露单个用户隐私资料的前提下，[小鸟壁纸 ]有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 五、 免责声明</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1、我们对于任何自本网站而获得的他人的信息、内容或者广告宣传等任何资讯（以下统称“信息”），不保证真实、准确和完整性。如果任何单位或者个人通过上述“信息”而进行任何行为，须自行甄别真伪和谨慎预防风险，否则，无论何种原因，我们不对任何非与我们直接发生的交易和/或行为承担任何直接、间接、附带或衍生的损失和责任。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2、我们不保证（包括但不限于）：</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) 我们网站及内容适合您的使用要求；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) 我们网站及内容不受干扰，及时、安全、可靠或不出现错误；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (c) 您经由我们网站取得的任何产品、服务或其他材料符合您的期望。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3、您使用经由我们网站下载或取得的任何资料，其风险由您自行承担；因该等使用导致您电脑系统损坏或资料流失，您应自己负完全责任；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 4、基于以下原因而造成的利润、商业信誉、资料损失或其他有形或无形损失，我们不承担任何直接、间接的赔偿：</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (a) 对我们网站及内容的使用或无法使用；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (b) 用户资料遭到未授权的使用或修改；</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; (c) 其他与我们相关的事宜。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 六、修改协议</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [小鸟壁纸 ]有权随时修改本协议的有关条款，一旦条款内容发生变动，[小鸟壁纸 ]将会在相关的页面提示修改内容。 用户如果不同意[小鸟壁纸 ]对服务条款所做的修改，可以放弃使用或访问本网站或取消已经获得的服务。如果用户继续使用服务，则视为用户接受服务条款的变动。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 七、本协议解释权归[小鸟壁纸 ]所有。</p><p style="margin-top: 5px; margin-bottom: 5px; font-family: sans-serif; white-space: normal;"><br></p><p><br></p></section>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checked = true,dialogVisible = false">已阅读</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="LoginDialogVisible"
      :append-to-body="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="340px"
      class="realName-dialog"
      center>
      <div class="dialogBox">
        <div class="dialogBg"/>
        <div class="dialogCont">
          <h1>
            <p>恭喜您</p>
            <p>注册成功</p>
          </h1>
          <div class="tips-box">
            <p class="loading">赶快登陆...</p>
            <p class="tips">去上传你的文件吧</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loginLoading" type="primary" @click="getLogin()">立即登陆</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import openWindow from '@/utils/openWindow'
import { validateEmail } from '@/utils/validate'
import { register, sendMail } from '@/api/index'
import { setUserInfo } from '@/utils/auth'

export default {
  name: 'Register',
  data() {
    const _this = this
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('请输入正确邮箱'))
      } else {
        callback()
      }
    }
    const validatePass = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePassword = function(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error('密码长度为6位以上'))
      } else {
        callback()
      }
    }

    const validatecode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('验证长度为6位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      loginLoading: false,
      checked: false,
      LoginDialogVisible: false,
      dialogTitle: '应用上传协议',
      dialogVisible: false,
      verifyCodeText: '获取验证码',
      registerForm: {
        email: '',
        code: '',
        password: '',
        qrPassword: '',
        wechat: '',
        imNumber: '',
        company: '',
        job: ''
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        qrPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur', validator: validatecode }]
      }
    }
  },
  methods: {
    next() {
      const self = this
      if (!self.checked) {
        self.$notify({
          title: '提示',
          message: '请先阅读应用上传协议！',
          type: 'error'
        })
        return
      }
      self.$refs.registerForm.validate(valid => {
        if (valid) {
          self.loading = true
          self.$parent.registerForm.email = self.registerForm.email
          self.$parent.registerForm.password = self.registerForm.password
          return new Promise((resolve, reject) => {
            register(self.registerForm).then(response => {
              self.loading = false
              const data = response.data
              const result = data.result
              if (data.error !== 0) {
                self.$notify({
                  title: '注册失败',
                  message: data.reason,
                  type: 'error'
                })
                return
              }
              self.$notify({
                title: '成功',
                message: '注册成功！',
                type: 'success'
              })
              self.$store.commit('SET_USERINFO', result)
              setUserInfo(result)
              if (result.realName === '1' || result.realName === 1) {
                setTimeout(function() {
                  self.$emit('setSelectType', { currentRole: 'realName' })
                }, 1000)
              } else {
                self.LoginDialogVisible = true
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goLogin() {
      const self = this
      self.$emit('setSelectType', { currentRole: 'login', selectType: 'login' })
    },
    getLogin() {
      this.loginLoading = true
      this.$emit('getLogin', this.$parent.registerForm)
    },
    getVerifyCode() {
      let timer = null
      let time = 60
      const self = this
      if (!validateEmail(this.registerForm.email)) {
        return
      }
      if (this.verifyCodeText === '获取验证码') {
        return new Promise((resolve, reject) => {
          sendMail(self.registerForm.email, 0).then(response => {
            const data = response.data
            if (data.error !== 0) {
              self.$notify({
                title: '发送失败',
                message: data.reason,
                type: 'error'
              })
              return
            }
            self.$notify({
              title: '发送成功',
              message: '已发送验证码至邮箱！',
              type: 'success'
            })
            self.verifyCodeText = '重新获取 ' + time + 'S'
            timer = setInterval(function() {
              if (time > 1) {
                time--
                self.verifyCodeText = '重新获取 ' + time + 'S'
              } else {
                clearInterval(timer)
                timer = null
                self.verifyCodeText = '获取验证码'
              }
            }, 1000)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      } else {
        return
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
$themeColor: #4f93fe;
.agreement-box{
  .el-dialog{
    margin-top: 0 !important;
  }
  &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:rgba(0,0,0,.1);
  }
  &::-webkit-scrollbar {//滚动条的宽度
    width:3px;
    height:3px;
  }
  &::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:rgba(0,0,0,.2);
    background-clip:padding-box;
    min-height:28px;
  }
  &::-webkit-scrollbar-thumb:hover{
    background-color: rgba(0,0,0,.3);
  }
}
.register-container{
  .step{
    width: 80%;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  .step-title{
    float: left;
    width: 120px;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 2px solid $themeColor;
    .step-num{
      background: #000;
      color: #fff;
      display: inline-block;
      border-radius: 100%;
      width: 16px;
      height: 16px;
      line-height: 18px;
      text-align: center;
      font-style: normal;
    }
  }
  .form-box{
    padding-top:70px;
    .line{
      position: relative;
    }
    .line::after{
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      height: 200px;
      border-right: 1px solid #eee;

    }
    .left-box{
    }
    .right-box{
      .el-form-item__label{
        color: #ccc;
      }
      .el-input{
        width: 80%;
      }
      .el-input__inner{
        padding: 0 !important;
      }
      .el-button{
        display: block;
        margin: 20px auto 0;
      }
      .el-button-group{
        float: right;
      }
    }
  }
}
</style>
