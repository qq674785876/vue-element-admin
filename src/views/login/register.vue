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
          <section data-role="outer" label="Powered by 365editor" style="font-family:微软雅黑;font-size:16px;"><p><span>服务协议</span></p><p><span>ipahc.com 用户协议已于2018年2月1日更新。</span></p><p><br></p><p><span>ipahc.com（除非特别说明，本服务协议所提及的 ipahc.com 同时包括 ipahc.com 网站）系由西安锦衣卫网络技术有限公司（以下简称“本公司”或“我们”）搭建并运营的为使用主体（以下简称“用户”或“您”）提供测试应用极速发布等一系列极速开发测试功能的服务平台，我们将通过 ipahc.com 为您提供内测托管、应用合并、命令行工具、权限控制、开放 API、Web Hooks 等服务（以下简称“ipahc.com 服务”或“服务”），服务内容将完全按照 ipahc.com 不时发布或修订的用户协议、隐私政策等规则（以下统称“ipahc.com 服务规则”）严格执行。</span></p><p><br></p><p><span>本协议是用户与本公司就 ipahc.com 服务所达成的协议，本公司对服务发布的单项条款、活动规则及公告、声明等，均为本协议不可分割的组成部分。如您拒绝接受本协议条款，将无法访问或使用 ipahc.com。如您点击接受本协议或访问、使用 ipahc.com 的全部或部分功能（无论该等访问是通过 ipahc.com 还是通过其他第三方媒介包括但不限于微信、QQ、GitHub 等渠道，下同），即表示您同意并接受本协议的所有条件和条款。如您点击接受本协议或访问、使用 ipahc.com 的全部或部分功能时是代表某一法人、非法人组织等实体，请确保该实体同意接受本协议的所有条件和条款且您已取得该实体的有效授权。</span></p><p><br></p><p><span>我们将不时对本协议进行修订或重新发布，本协议之修订稿或更新版本一经公布即有效并替代原有协议。用户可随时查阅最新协议，如您不同意相关变更，应立即停止使用 ipahc.com 的各项服务。</span></p><p><br></p><p><span>一、服务适用条件</span></p><p><span>1.1 我们只在法律允许的国家与地区提供 ipahc.com 服务，且发布或提供的信息、产品及服务无意提供给受法律限制的国家的人士或居民使用，也不构成对上述主体的任何邀请。</span></p><p><br></p><p><span>1.2 注册用户应满足下列条件：</span></p><p><br></p><p><span>1.2.1 系具有完全民事行为能力的自然人；或系依据中国法律成立并合法存续的法人或非法人组织。</span></p><p><br></p><p><span>1.2.2 了解并接受本协议及本公司、ipahc.com 发布的一切相关规则，且履行前述协议与规则将不会违反您所属、所居住或开展经营活动或其他业务所在的国家或地区的法律。</span></p><p><br></p><p><span>1.2.3 按注册页要求提交真实有效的身份信息（法人、非法人组织等实体应提供真实有效的工商资料）与联系方式，并经实名认证审核通过。</span></p><p><br></p><p><span>1.3 用户在使用发布、应用合并、应用开放下载、命令行工具、权限控制、开放 API、Web Hooks 等功能（以下简称“开发者功能”）时即为“开发者”，用户在使用浏览、下载功能（以下简称“一般功能”）时为“接收者”。任何用户均可使用 ipahc.com 服务中的一般功能，但根据中国相关法律法规的规定，开发者必须经过实名认证方可正常使用 ipahc.com 服务，特别是 ipahc.com 服务中所包含的开发者功能。您接受并理解我们仅为完成登录验证的注册用户提供 ipahc.com 服务中的开发者功能。</span></p><p><br></p><p><span>1.4 非符合本协议约定条件者不得使用对应的 ipahc.com 服务，一经发现，我们有权立即终止对该用户的服务，并追究其相关责任。</span></p><p><br></p><p><span>二、ipahc.com 服务</span></p><p><span>2.1 服务范围</span></p><p><br></p><p><span>2.1.1 我们将通过 ipahc.com 为您提供内测托管、应用合并、命令行工具、权限控制、开放 API、Web Hooks 等 ipahc.com 服务</span></p><p><span>2.2 服务相关注意事项</span></p><p><br></p><p><span>2.2.1 ipahc.com 旨在为 iOS 开发、Android 开发、测试工程师、产品经理等专业人士提供更高效的开发测试体验，平台上发布的应用程序均为非公开版本的测试阶段程序，不具备面向不特定公众发布的条件，我们对该等程序仅可进行初步的形式审查，无法详细分析每一应用程序的运行后果及风险。请您审慎地甄别应用程序的质量，切勿因为垃圾短信、邮件、文字说明等内容随意下载来源不可靠的应用程序，请根据应用下载链接的来源自行判断并下载可信任的应用程序。如您非专业人士，请至各应用程序商店搜索并下载特定应用程序的公开版本。对于通过 ipahc.com 发布的应用程序或 ipahc.com 上展示的其他站点的链接，ipahc.com 不对该程序或站点的规则、政策或具体内容负责。</span></p><p><br></p><p><span>2.2.2 我们有权根据用户类别、使用习惯等实际情况自行决定对该用户数据的最长储存期限，并在服务器上为其分配数据最大存储空间。ipahc.com 对于免费用户数据保存时间为30日，付费用户数据保存时间为次数包消耗完毕后30日。如您采用注销账号、连续365日未登录等形式停止使用 ipahc.com 服务，或被取消 ipahc.com 用户资格、终止服务的，我们有权自您停用或被取消资格满7日后永久删除您储存于本公司服务器上的全部数据，而不负有向您返还前述数据的义务。如您确需前述数据，请务必提前完成数据备份工作。</span></p><p><br></p><p><span>2.2.3 用户在接受 ipahc.com 各项服务的同时，同意接受我们提供的各类信息服务。用户在此授权本公司通过 ipahc.com 向其电子邮件、手机、通信地址等发送通知及商业信息。用户有权选择不接受 ipahc.com 提供的各类信息服务，可进入 ipahc.com 相关页面进行更改或按照相应联系方式中提示进行操作。</span></p><p><br></p><p><span>2.3 下载次数与付费充值</span></p><p><br></p><p><span>2.3.1 请您谅解，ipahc.com 在为您提供更高效的开发测试体验的同时，必须控制某些可能涉嫌违规的应用在未被发现时造成的影响范围，因此 ipahc.com 不得不限制开发者所发布应用的下载次数。</span></p><p><br></p><p><span>2.3.2 您作为开发者发布的应用程序，每一应用程序经接收者下载一次即消耗管理员账户中的一次下载次数。每一用户每日免费下载次数限制为30次，超过限制后，该用户发布的应用程序将不能下载，如需额外下载次数，请根据实际测试需求提前充值购买下载次数包。您认可我们对 ipahc.com 享有费用调整之权利。如您需要包年方案或私有定制方案，欢迎联系&nbsp;</span></p><p><br></p><p><span>2.3.3 下载次数统一从应用的管理员账户扣除，充值时请注意在管理员账户购买下载次数包，请勿在测试成员的账户下购买，否则，购买的下载次数包只能用户该测试成员的账户所发布的应用程序下载。</span></p><p><br></p><p><span>2.3.4 本协议终止后，本公司在协议有效期内因提供服务而已经收取的费用不因协议终止而返还。</span></p><p><br></p><p><span>2.4 服务的变更与终止</span></p><p><br></p><p><span>2.4.1 ipahc.com 有权行使修改或中断服务的权利，不需对用户或任何无直接关系的第三方负责。如该修改或中断为 ipahc.com 主动发起的，ipahc.com 将于该修改或中断发生前3日将相应通知发布于网站应用管理页面的站内通知位置。如该修改或中断系由不可抗力、意外事件等原因所致而非 ipahc.com 主动发起，则 ipahc.com 将于该修改或中断恢复后1日将相应通知发布于网站应用管理页面的站内通知位置。</span></p><p><br></p><p><span>2.4.2 为确保用户体验、维护网络安全，您同意我们有权选择是否提供服务，并有权对 ipahc.com 功能、用户权限等进行调整。如您对本协议的修改或我们提供的服务有异议，可以行使如下权利：</span></p><p><br></p><p><span>2.4.2.1 停止使用 ipahc.com 服务；</span></p><p><br></p><p><span>2.4.2.1 将您的建议通过应用管理页面右下角的客服聊天对话框提交给我们，我们感谢并将认真对待您的宝贵建议。</span></p><p><br></p><p><span>2.4.3 如用户有下列行为之一，我们有权立即解除本协议，并要求用户赔偿本公司因此所致的全部损失：</span></p><p><br></p><p><span>2.4.3.1 违反本协议或其他 ipahc.com 服务规则的；</span></p><p><br></p><p><span>2.4.3.2 利用 ipahc.com 服务进行包括但不限于危害计算机信息网络安全、侵犯知识产权、洗钱、赌博、诈骗、传销、非法集资、淫秽色情、恐怖融资等违法、犯罪活动的，或因涉嫌参与前述活动被公安机关、检察机关决定立案侦查满60日而未撤销案件的；</span></p><p><br></p><p><span>2.4.3.3 利用 ipahc.com 服务进行包括损害公共秩序、善良风俗或社会道德的行为在内的任何不当行为的；</span></p><p><br></p><p><span>2.4.3.4 发布不实言论故意诋毁或损害本公司声誉的；</span></p><p><br></p><p><span>2.4.3.5 无理由拒绝受理用户或客户使用 ipahc.com 进行交易的；</span></p><p><br></p><p><span>2.4.4 用户出现下列情形之一，本协议自该情形发生之日起即告终止：</span></p><p><br></p><p><span>2.4.4.1 自然人用户死亡、成为限制民事行为能力人或成为无民事行为能力人等丧失继续履行本协议能力的；</span></p><p><br></p><p><span>2.4.4.2 自然人以外的其他用户出现无法继续经营、停业、或进入破产清算程序、解散、注销、被取缔或吊销营业执照等不具备履行本协议的资质及能力的；</span></p><p><br></p><p><span>2.4.4.3 用户注销账号，或连续未登录 ipahc.com 满365日等形式停止使用 ipahc.com 服务的。</span></p><p><br></p><p><span>三、隐私政策</span></p><p><span>用户在使用 ipahc.com 服务过程中应遵守 ipahc.com 不时发布并修订的隐私政策，并受到该政策的保护，详见 https://ipahc.com/privacy。</span></p><p><br></p><p><span>四、用户权责</span></p><p><span>4.1 您在 ipahc.com 注册时，须提供真实身份信息并进行实名认证。如您在完成实名认证后变更任何身份信息，应在变更发生后三个工作日内书面通知 ipahc.com 进行变更认证，否则 ipahc.com 有权随时单方面终止提供服务，因此造成的全部后果，由您自行承担。</span></p><p><br></p><p><span>注册时，您应向我们提供合法、真实、准确、有效的实名认证资料：</span></p><p><br></p><p><span>4.1.1 自然人提供的实名认证资料包括但不限于姓名、身份证号（或其他身份识别号）、本人电话、联系地址、电子邮箱、身份证正面及反面照片、本人手持身份证照片（不能遮挡个人头像）；</span></p><p><br></p><p><span>4.1.2 法人或非法人组织提供的实名认证资料包括但不限于名称、社会统一信用代码（或其他主体身份识别号）、营业执照副本（或其他主体资质证照）扫描件；公司授权代理人姓名及身份证正面及反面照片、本人手持身份证照片（不能遮挡个人头像）、本人电话、联系地址、电子邮箱（至少提供其一）。</span></p><p><br></p><p><span>4.2 经我们审核通过后如有信息变更，您应在变更后7日内书面通知我们并通过系统提交资料变更申请。如果您提供的注册资料不合法、不真实、不准确，或有隐瞒的，应承担因此引起的相应责任及后果，并且我们保留中止或终止前述用户使用 ipahc.com 各项服务的权利。</span></p><p><br></p><p><span>4.3 用户的账户、密码和安全性：</span></p><p><br></p><p><span>4.3.1 您选择成为 ipahc.com 注册用户的，可自行创建账户与昵称。账户和昵称的命名及使用应遵守相关法律法规并符合社会道德，不能含有任何侮辱、威胁、淫秽、谩骂等侵害他人合法权益的文字。</span></p><p><br></p><p><span>4.3.2 用户账户密码遗失的，可以通过注册电子邮箱发送的链接重置密码，如您发现任何非法使用账户或存在其他安全漏洞的情况，请立即告知我们。</span></p><p><br></p><p><span>4.3.3 您需自行负责维护您的账户、密码 API token 的机密性，您的账号利用 ipahc.com 服务进行的包括但不限于点击同意各类协议与规则、提交或变更身份信息、上传和发布应用程序、信息查询、指令发送等全部操作、直接或间接利用 ipahc.com 服务发送的全部指令，均视为您本人所为的操作、发出的指令，凡行为流程符合 ipahc.com 服务要求，即不可撤销，相应后果将由您承担。任何用户通过您的 API token 所进行的上传应用、获取对应账号下全部应用的下载权限、更改应用信息、下载等操作、指令，都将被视为经您授权所进行的操作、指令，凡行为流程符合 ipahc.com 服务要求，即不可撤销，相应后果将由您承担。</span></p><p><br></p><p><span>4.3.4 服务中，为确保您账户的安全性，我们将不时验证您的用户身份与资格。验证形式可能包括密码、验证码、账户绑定手机、账户绑定邮箱等，如未能通过相应验证，将可能导致服务的临时性中断，由此所致的损失由您自行承担。</span></p><p><br></p><p><span>4.4 您应定期备份您账号在我们平台系统中的数据并妥善保管，因未定期备份导致的损失或因此导致的扩大损失应由您自行承担相应后果。如您随应用程序提供更新日志、应用描述，则您可以复制和使用前述内容，但仅供您个人参考之用。</span></p><p><br></p><p><span>4.5 如在使用 ipahc.com 服务过程中发现异常，请在72小时内联系我们，完整、准确记录当前故障现象后向我们提供故障记录。</span></p><p><br></p><p><span>4.6 您依据本协议所享有的权利及义务不可转让，亦不得在未经本公司书面同意的情况下以任何方式令第三方使用 ipahc.com 服务或令第三方通过 ipahc.com 发出任何指令信息。</span></p><p><br></p><p><span>4.7 任何用户不得利用 ipahc.com 服务危害网络安全，不得危害国家安全、荣誉和利益，不得煽动颠覆国家政权、推翻社会主义制度，不得煽动分裂国家、破坏国家统一，不得宣扬恐怖主义、极端主义、民族仇恨、民族歧视，不得传播暴力、淫秽色情信息，不得编造、传播虚假信息扰乱经济秩序和社会秩序，不得侵害他人名誉、隐私、知识产权和其他合法权益。</span></p><p><br></p><p><span>4.8 任何用户不得利用 ipahc.com 服务制作、复制、发布、传播含有下列内容的信息：</span></p><p><br></p><p><span>4.8.1 反对宪法所确定的基本原则的；</span></p><p><br></p><p><span>4.8.2 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span></p><p><br></p><p><span>4.8.3 损害国家荣誉和利益的；</span></p><p><br></p><p><span>4.8.4 煽动民族仇恨、民族歧视，破坏民族团结的；</span></p><p><br></p><p><span>4.8.5 破坏国家宗教政策，宣扬邪教和封建迷信的；</span></p><p><br></p><p><span>4.8.6 散布谣言，扰乱社会秩序，破坏社会稳定的；</span></p><p><br></p><p><span>4.8.7 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</span></p><p><br></p><p><span>4.8.8 侮辱或者诽谤他人，侵害他人合法权益的；</span></p><p><br></p><p><span>4.8.9 含有法律、行政法规禁止的其他内容的。</span></p><p><br></p><p><span>4.9 用户不得通过任何手段恶意注册 ipahc.com 账户，亦不得盗用其他用户账户。禁止用户将 ipahc.com 以任何形式作为从事各种非法活动的场所、平台或媒介。我们严禁用户（不论是否完成实名认证）利用 ipahc.com 服务对开发者发布的应用程序进行恶意的多次重复下载。如您作为开发者发布的应用程序受到任何第三方恶意的多次重复下载的，请在应用管理页面通过线上客服沟通工具与客服联系。</span></p><p><br></p><p><span>4.10 用户不得以任何形式破坏或规避 ipahc.com 服务中的任何技术限制，亦不得以任何形式破坏或规避其他用户发布的应用程序中的任何技术限制，不得在未取得权利人明确书面授权的情况下对 ipahc.com 或应用程序进行复制、发布、出租、出借、反向工程、反向编译或反汇编等操作。</span></p><p><br></p><p><span>4.11 开发者特殊规则</span></p><p><br></p><p><span>4.11.1 发布前，对于您通过 ipahc.com 所要发布的应用程序所包含的全部内容，请确认您均系其合法权利人或已经取得权利人的依法授权，前述应用程序不得包含任何恶意代码，不应侵犯任何第三方的合法权益。</span></p><p><br></p><p><span>4.11.2 您通过 ipahc.com 发布的应用程序如需收集任何他人个人信息，该等信息应为您提供服务所必须收集的信息，否则不得收集。收集该等信息前必须经过被收集者同意。您同意接受并承诺您的应用程序对被收集者信息的保护力度不低于 ipahc.com 对外公布的最新隐私政策&nbsp;</span></p><p><br></p><p><span>4.11.3 您通过 ipahc.com 发布的应用程序不得在未经未成年人法定代理人同意的情况下收集或发布任何未成年人的身份信息和地理位置、指纹、声纹、面部识别、使用偏好等隐私信息。</span></p><p><br></p><p><span>4.11.4 您通过 ipahc.com 发布的应用程序不得未经接收者同意而向其发送任何商业信息，经接收者同意而发送的商业信息中应包含您的真实身份和联系方式，并向接收者提供拒绝继续接收的方式。</span></p><p><br></p><p><span>4.11.5 您应当保障接收者在安装或使用您发布的应用程序过程中的知情权和选择权，未向接收者明示并经其同意，不得开启收集地理位置、读取通讯录、使用摄像头、启用录音等功能，不得开启与服务无关的功能，不得捆绑安装无关应用程序。</span></p><p><br></p><p><span>4.11.6 您发布的应用程序不得采取任何方式诱导接收者，令其误以为该应用程序存在由 ipahc.com 发布、由 ipahc.com 提供服务、与 ipahc.com 发生款项往来或由 ipahc.com 承担任何责任等情形。</span></p><p><br></p><p><span>4.12 未经本公司的授权或许可，任何主体不得借用本公司或 ipahc.com 的名义从事任何商业活动，也不得以任何形式将 ipahc.com 作为从事商业活动的场所、平台或媒介。</span></p><p><br></p><p><span>4.13 用户违反本协议规定，则 ipahc.com 有权直接采取一切必要的措施，包括但不限于警告、临时性或永久性冻结单一用户账户、临时性或永久性冻结同一邮箱或同一手机号码对应的全部用户账户查询账户交易信息、强制注销账户、临时性或永久性冻结应用程序下载功能、向有关机关提供包括实名认证信息、交易记录在内的账户信息，甚至于通过司法途径追究用户相应法律责任等。用户违反本用户协议之行为给本公司、其他用户或其他第三方造成损失的，应对受害方进行赔偿。</span></p><p><br></p><p><span>五、知识产权及其他权利</span></p><p><span>5.1 如无其他声明，我们提供本协议项下服务所涉及的全部产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图形、徽标、按钮图标、图像、音频、视频、图表、色彩、版面设计、电子文档、数据编译、软件及内容汇编称一体的连贯的网站）的所有权利（包括但不限于著作权、商标权、专利权、商业秘密及其他所有相关权利）均归本公司所有。未经本公司书面许可，您不得以任何形式擅自使用（包括但不限于通过任何程序或设备监视、复制、传播、展示、镜像、上传、下载任何内容）或许可他人使用。</span></p><p><br></p><p><span>5.2 本公司的 Logo、“ipahc.com”、ipahc.com 标识等文字、图形及其组合，以及 ipahc.com 的其他图形、徽标、产品和服务名称均由本公司享有完全的权利，未经我们书面授权，您不得以任何方式进行展示、使用、创造相关衍生作品或作其他处理，也不得向任何第三方表明您有权展示、使用、创造相关衍生作品或作其他处理。</span></p><p><br></p><p><span>5.3 用户如有违反前款约定，因侵犯权利所得收益归本公司所有，并应赔偿本公司因此所受到的损失。</span></p><p><br></p><p><span>六、拒绝担保与免责</span></p><p><span>6.1 ipahc.com 作为提供极速开发测试的服务平台，基于互联网的特殊性及现有技术的局限性，我们仅可按照 ipahc.com 现状提供服务，无法担保 ipahc.com 上的信息及服务能充分满足用户的需求，亦无法就服务的及时、安全、无中断、无缺陷、无错误作任何保证。您应自行承担服务 ipahc.com 的使用风险，请确认在使用服务前您已经充分了解 ipahc.com 现状。</span></p><p><br></p><p><span>6.2 在我们通过 ipahc.com 向您提供服务的过程中如发生“不可抗力”，即发生无法预见、无法避免或合理控制的事件，且该等事件对遭遇不可抗力的一方履行本协议的行为发生实质性妨碍，包括但不限于地震、台风、洪水、战争、暴动、罢工、火灾、政府政策变更、政府或政府委托的单位或机构作出的行政及司法行为、黑客攻击、电脑病毒、网络故障、电信/联通管制、带宽或其他网络设备或通讯运营商服务延迟及技术故障等类似事件，致使我们无法全部或部分履行本协议的，本公司不因此而承担任何责任，但我们将采取一切必要措施减少损失，并在事件消除后尽最大努力恢复服务。</span></p><p><br></p><p><span>6.3 由于电信运营商等服务所依赖的第三方服务提供商之系统、线路的故障、调整、升级，或电力中断/终断，或黑客攻击、木马、病毒、技术或网络故障、系统升级、电信/联通管制、带宽或其他网络设备或通讯运营商服务延迟等原因造成服务无法正常提供的，本公司不因此而承担任何责任。</span></p><p><br></p><p><span>6.4 在任何情况下，对于您使用我们服务过程中涉及由第三方提供相关服务的责任由该第三方承担，本公司不承担相应责任：</span></p><p><br></p><p><span>6.4.1 因 ipahc.com 服务所依赖的第三方之违法、不当行为致使用户受损的；</span></p><p><br></p><p><span>6.4.2 因 ipahc.com 其他用户违法、不当行为致使用户受损的；</span></p><p><br></p><p><span>6.4.3 因其他 ipahc.com 不可控的原因导致的任何损失或责任。</span></p><p><br></p><p><span>6.5 因您自身原因导致的任何损失或责任，由用户自行负责，包括但不限于：</span></p><p><br></p><p><span>6.5.1 未按照本协议或我们发布的任何规则进行操作导致的任何损失或责任；</span></p><p><br></p><p><span>6.5.2 发送的电子指令信息不明、存在乱码、不完整等；</span></p><p><br></p><p><span>6.5.3 您未经审慎确认即对任何第三方开放权限、发送信息、支付金钱等；</span></p><p><br></p><p><span>6.5.4 其他由您所导致的任何损失或责任。</span></p><p><br></p><p><span>6.6 在我们提供服务过程中，如出现数据误差，我们将与您密切配合查明原因。由于互联网相关之技术服务的特殊性，我们对非因我们过错所致的损失，不承担相应责任。如确因我们过错给您造成损失的，本公司将予以赔偿，赔偿额度以数据误差次数包总额之2倍为限。</span></p><p><br></p><p><span>6.7 ipahc.com 发给用户的通告，我们都将通过正式的页面公告、站内信、电子邮件、短信或常规的信件送达。对于任何非经 ipahc.com 正规渠道获得的中奖、优惠等活动、通知或信息，本公司不承担相应责任。</span></p><p><br></p><p><span>七、投诉通道</span></p><p><span>7.1 如果用户或任何第三方认为并有法律依据和足够的证据证明本公司或 ipahc.com 用户存在以下行为，有权联系我们进行投诉，我们将在审慎地进行调查后，根据自身判断决定是否对相关对象采取删除、冻结、屏蔽、断开连接、诉诸法律手段等必要措施：</span></p><p><br></p><p><span>7.1.1 用户从事违法行为、不当行为或违反本协议约定之行为的；</span></p><p><br></p><p><span>7.1.2 用户被删除、改变了自己管理电子信息权限的；</span></p><p><br></p><p><span>7.1.3 用户受到来自其他 ipahc.com 账号恶意刷下载量等恶意行为攻击的；</span></p><p><br></p><p><span>7.1.4 本公司或 ipahc.com 发布的任何信息侵犯您的合法权益的。</span></p><p><br></p><p><span>7.2 投诉应当以书面形式进行，您可以通过下列方式发送您的书面投诉：</span></p><p><br></p><p><span>邮箱：help@ipahc.com</span></p><p><br></p><p><span>7.3 投诉内容应包括：</span></p><p><br></p><p><span>7.3.1 权利人的姓名（名称）、身份证号，手机号；</span></p><p><br></p><p><span>7.3.2 要求我们采取相应措施的应用被举报的原因；</span></p><p><br></p><p><span>7.3.3 前述内容违反法律或侵犯您合法权益的初步证明材料。</span></p><p><br></p><p><span>7.4 我们提请用户注意：</span></p><p><br></p><p><span>7.4.1 包含前述各项内容的投诉方为有效投诉。我们的工作人员将在15日内进行回复您的有效投诉。</span></p><p><br></p><p><span>7.4.2 您应当对前述投诉内容的真实性负责，如果您恶意投诉不实信息，将有可能承担相应的法律责任。</span></p><p><br></p><p><span>八、适用法律和裁判地点</span></p><p><span>8.1 因本协议而引起或与之相关的一切争议、权利主张或其它事项，均受中华人民共和国法律（香港、澳门、台湾地区法律除外）的管辖。</span></p><p><br></p><p><span>8.2 用户和本公司因履行本协议发生争议的，应首先本着诚信原则通过协商加以解决。如果协商不成，则应向本公司所在地人民法院提起诉讼。</span></p><p><br></p><p><span>九、可分性</span></p><p><span>如果本协议的任何条款被视为不合法、无效或因任何原因而无法执行，则此等规定应视为可分割，不影响任何其它条款的法律效力。</span></p><p><br></p><p><span>十、冲突选择</span></p><p><span>本协议是本公司与用户注册成为 ipahc.com 用户，使用 ipahc.com 服务之间的重要法律文件，此前双方任何非书面意思表示与本协议不一致的，均应当以本协议为准。</span></p><p><br></p><p><span>十一、完整协议</span></p><p><span>包括本协议、隐私政策在内的 ipahc.com 规则，及其补充和更新条款共同构成 ipahc.com 完整的服务协议。tapk</span></p><p><br></p></section>
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
  .agreement-text {
    p {
      margin: 0;
    }
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
